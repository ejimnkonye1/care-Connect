import { useState, useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
      const [menuOpen, setMenuOpen] = useState(false);
      const [scrolled, setScrolled] = useState(false);
      const navigate = useNavigate()
        const HandleLogin = () => {
            navigate ('/login')
        }
        const toggleMenu = () => {
         setMenuOpen(prevState => !prevState);
          console.log('Menu is open:', menuOpen);
        };
        useEffect(() => {
            const handleScroll = () => setScrolled(window.scrollY > 0);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);
    return(
<header className={`flex justify-between items-center fixed top-0 p-4 z-10  w-full ${scrolled? 'bg-gray-700 ':'bg-white'}`}>
<a className="text-2xl font-bold p-2" href="#">
          <span className="text-[#f7b45d]">𝓒𝓪𝓻𝓮</span>
          <span className="text-[#00adef]">𝓬𝓸𝓷𝓷𝓮𝓬𝓽</span>
        </a>
        <nav className="flex items-center z-10 text-black">
            <button 
                className="block lg:hidden bg-transparent border-none cursor-pointer z-30" 
                onClick={toggleMenu}
            >
                {menuOpen ? (
                    <MdOutlineCancel className="text-white text-2xl" />
                ) : (
                    <RxHamburgerMenu className="text-whit text-2xl" />
                )}
            </button>
    
            <ul 
                className={`flex-col lg:flex-row items-center m-2 p-2 transition-all duration-300 
                    ${menuOpen ? 'flex absolute top-0 left-0 w-full bg-[#457AD4] p-4 flex-col items-center z-20 shadow-lg rounded-lg' : 'hidden lg:flex'} 
                    lg:static lg:bg-transparent lg:shadow-none`}
            >
                <li className={`${menuOpen? 'mb-2':''}`}>
                    <a href="#/" className={`text-black text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300" ${scrolled? 'text-white':''}`} >Home</a>
                </li>
                <li className={`${menuOpen? 'mb-2':''} `} >
                    <a href="#Our mission" className={`text-black text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300" ${scrolled? 'text-white':''}`}>Our Mission</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a href="#testimonials" className={`text-black text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300" ${scrolled? 'text-white':''}`} >Testimonials</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a href="#pricing" className={`text-black text-base font-semibold px-8 py-2 transition-colors duration-200 hover:text-gray-300" ${scrolled? 'text-white':''}`}>Pricing</a>
                </li>
                <li className={`${menuOpen? 'mb-3':''}`}>
                    <a 
                     onClick={HandleLogin}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white text-base font-semibold px-8 py-2 rounded-full transition-colors duration-200 hover:bg-[#5494FF] bg-[#00adef] hover:text-white cursor-pointer"
                    >
                       Sign In
                    </a>
                </li>
            </ul>
        </nav>
    </header>      
    )
}