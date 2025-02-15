import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ value, onChange }) {
  return (
    <PhoneInput
      country={"bj"}
      value={value}
      onChange={onChange}
      placeholder="Numéro de téléphone"
    />
  );
}
