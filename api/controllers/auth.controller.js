import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { getCountryCallingCode } from '../utils/getCountryCallingCode.js';
import { validatePhoneNumber } from '../utils/validatePhoneNumber.js';
import jwt from "jsonwebtoken";
import { verifyIdToken } from '../../firebaseAdmin.js';

export const signup = async(req, res) => {
    const {nom, prenom, password, telephone, countryCode} = req.body;
    console.log(req.body.email)
    let email;
    let hashedPassword, newUser;

    if (!req.body.email || req.body.email.trim() === "") {
      req.body.email = undefined;
      email = req.body.email;
    }


    if(!validatePhoneNumber(telephone, countryCode)){
        return res.status(400).json({ message: "Le numéro de téléphone n'est pas valide.", success: false });
    }

    if(password){
        if(password.length < 8){
            return res.status(400).json({message: "Le mot de passe doit contenir au moins 8 caractères", success: false})
        }
    }

    hashedPassword = bcryptjs.hashSync(password, 10);
    newUser = new User({nom, prenom, password:hashedPassword, 
      email: ((!req.body.email || req.body.email.trim() ) === "" ? undefined : req.body.email),
      telephone, countryCode:getCountryCallingCode(countryCode)});

    try {
        await newUser.save();
        res.status(201).json({message: "Votre compte est créé avec succès. Connectez-vous maintenant", success: true});
    } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(400).json({message: "Remplissez tous les champs avec *", success: false});
        }

        if(error.code === 11000){
            if(error.keyValue){
                return res.status(400).json({message: "Email ou téléphone déjà utilisé", success: false});
            }
        }
        res.status(500).json(error);
    }
}

export const signin = async (req, res) => {
  try {
    const { identifiant, password } = req.body;

    const userFound = await User.findOne({
      $or: [{ email: identifiant.replace(/\s+/g, "") }, { telephone: identifiant.replace(/\s+/g, "") }],
    });

    if (!userFound) {
      return res.status(401).json({
        message: "La connexion a échoué. Vérifiez vos informations ou inscrivez-vous.",
        success: false,
      });
    }

    const authentified = bcryptjs.compareSync(password, userFound.password);

    if (!authentified) {
      return res.status(401).json({
        message: "La connexion a échoué. Mot de passe incorrect.",
        success: false,
      });
    }

    const {password: pass, ...rest} = userFound._doc;

    const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET);

    res
    .cookie(
        "access_token", 
        token, 
        {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict"}
        )
    .status(200)
    .json({
      message: "Vous êtes connecté avec succès.",
      success: true,
      user: {rest}
    });

  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      success: false,
    });
  }
};

export const google = async (req, res) => {
    const {idToken, telephone, countryCode} = req.body;
    try {
        const decodedToken = await verifyIdToken(idToken);
        const email = decodedToken.email.replace(/\s+/g, "");
        
        const userFound = await User.findOne({
          $and:[{email}, {telephone:decodedToken.telephone}]
        });

        if(!userFound){
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

          const newUser = await User.create({
            prenom: decodedToken.name,
            countryCode: getCountryCallingCode(countryCode),
            telephone,
            password: hashedPassword,
            email: decodedToken.email  
          });

          await newUser.save();

          const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
          const {password: pass, ...rest} = newUser._doc;

          res
          .cookie("acces_token", token, {httpOnly: true})
          .status(200)
          .json({
            "message": "Connexion réussie",
            success: true,
            user: {email:undefined, rest}
          });
        }
        else{
          const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET);

          const {password: pass, ...rest} = userFound._doc;

          res
          .cookie('access_token', token, {httpOnly: true})
          .status(200)
          .json({
            "message": "Connexion réussie",
            success: true,
            user: rest
          })
    }

    } catch (error) {
      if(error.code === 11000){
        if(error.keyValue){
            return res.status(400).json({message: "Email ou telephone déjà utilisé", success: false});
        }
      }

        res.status(500).json({
        message: `Une erreur est survenue. Veuillez réessayer plus tard : ${error}`,
        success: false,
      });
    }
}
