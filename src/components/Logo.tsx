import { Link } from "react-router-dom"
import LogoImage from "../icons/logo.png"

const Logo = () => {
    return (
        <>
            <Link to="/">
                <div className='flex flex-row'>

                    <img src={LogoImage} className="w-100 h-10 mr-2" alt="Logo" />
                    <h1 className='text-zinc-500 mr-2 py-2 font-serif text-2xl ' >HOMECRAFT</h1>

                </div>
            </Link>
        </>
    )
}

export default Logo
