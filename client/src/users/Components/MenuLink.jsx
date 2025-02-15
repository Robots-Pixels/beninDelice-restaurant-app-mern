import { useState, useRef, useEffect} from "react"
import { Link } from "react-router-dom"

export default function MenuLink({children, categorySelected, setCategorySelected}) {

const [isActive, setIsactive] = useState(false);

const handleClick = () => {
    setCategorySelected(children)
}

useEffect(() => {
    if (categorySelected === children){
        setIsactive(true)
    }
    else{
        setIsactive(false)
    }
}, [categorySelected])


return (
    <Link className='relative group' onClick={handleClick}>
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-lg bg-third scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100 ${isActive ? "scale-x-100" : ""}`}>
        </span>
    </Link>
  )
}
