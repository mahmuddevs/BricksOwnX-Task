import { useContext, useEffect, useState } from "react"
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"
import { Link, NavLink } from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import { motion } from "motion/react"
import useAuth from "../hooks/useAuth";
import { FaHeart } from "react-icons/fa";
import { LcContext } from "../contexts/LCProvider";


const Header = () => {
    const [navOpen, setNavOpen] = useState(false)
    const { user, logOut } = useAuth()
    const { fav } = useContext(LcContext)


    const navItems = (
        <>
            <li className="flex justify-between">
                <NavLink to='/'>Home</NavLink>
                <IoMdClose onClick={() => { setNavOpen(false) }} className="block lg:hidden cursor-pointer text-xl" />
            </li>
        </>
    )

    const handleLogout = () => {
        logOut().then(() => {
            console.log('user logged out')
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <header className="z-40 fixed top-0 left-0 right-0 bg-[#151515]/60 drop-shadow-lg backdrop-blur-lg">
            <div className="w-11/12 md:container xl:w-9/12 mx-auto py-2 lg:py-5 flex justify-between items-center text-white">
                <Link to='/'>
                    <h4 className="font-black text-lg md:text-2xl">Title</h4>
                </Link>
                <nav className="flex gap-6 uppercase items-center">
                    <motion.ul className={`uppercase flex flex-col lg:flex-row lg:items-center gap-6 font-extrabols fixed lg:static top-0 w-56 h-screen lg:h-auto lg:w-auto p-8 lg:p-0 bg-[#151515]/90 lg:bg-transparent z-50`}
                        initial={{ right: '-14rem' }}
                        animate={{ right: navOpen ? '0' : '-14rem' }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        {navItems}
                    </motion.ul>
                    {user ?
                        <div className="flex items-center gap-4">
                            <div className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full" id="profile-pic">
                                    <img
                                        alt={user?.displayName}
                                        src={user?.photoURL || '/user.png'}
                                    />
                                </div>
                                <Tooltip
                                    anchorSelect="#profile-pic"
                                    place="bottom"
                                    className="!p-2 !rounded-lg !bg-gray-700 !text-white !w-40 !h-24" clickable
                                >
                                    <div className="flex flex-col justify-center items-center space-y-2 py-2">
                                        <p className="font-bold !text-sm">{user?.displayName || 'loading...'}</p>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        :
                        <>
                            <ul className="menu-horizontal items-center flex px-1 gap-6  text-white">
                                <li><NavLink to='/auth/login'>Login</NavLink></li>
                                <li><NavLink to='/auth/register'>Register</NavLink></li>
                            </ul>
                        </>
                    }
                    <div className="flex gap-6">
                        <div className="relative">
                            <NavLink className="text-2xl text-red-600" to='/favourtie'><FaHeart /></NavLink>
                            {
                                fav?.length > 0 && <span
                                    className="p-1 absolute -top-1 -right-1.5 text-sm rounded-full bg-black/50 text-white flex items-center justify-center"
                                    style={{ width: "18px", height: "18px" }}
                                >
                                    {fav?.length}
                                </span>
                            }
                        </div>
                        <FaBarsStaggered onClick={() => { setNavOpen(true) }} className="block lg:hidden cursor-pointer fill-white stroke-white text-xl" />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header