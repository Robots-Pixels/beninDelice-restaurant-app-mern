import { Link } from "react-router-dom"

export default function Navlink({children, to}) {
  return (
    <Link className='relative group' to={to}>
        {children}
        <span className='absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-md scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100'>
        </span>
    </Link>
  )
}
