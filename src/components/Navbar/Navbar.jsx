import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import { AuthContext } from '../../context/Context';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';


const getLinkStyle = ({ isActive }) => {
    return {
        color: isActive ? '#2563eb' : '', 
        borderBottom: isActive ? '2px solid #2563eb' : 'none', 
        paddingBottom: '2px'
    };
};

const Navbar = () => {


    const { user, theme, toggleTheme } = useContext(AuthContext);

    const links = <>
        <li><NavLink to="/" style={getLinkStyle}>Home</NavLink></li>
        <li><NavLink to="/services" style={getLinkStyle}>Services</NavLink></li>
    </>

    const private_links = <>
        <li><NavLink to="/my-services" style={getLinkStyle}>My Services</NavLink></li>
        <li><NavLink to="/add-service" style={getLinkStyle}>Add Service</NavLink></li>
        <li><NavLink to="/my-bookings" style={getLinkStyle}>My Bookings</NavLink></li>
        <li><NavLink to="/profile" style={getLinkStyle}>profile</NavLink></li>
    </>


    const Navigate = useNavigate();


    const handleLogout = () => {
        console.log("clicked");
        signOut(auth)
            .then(() => {
                toast("Logout Succesfull")
                Navigate("/");
            })
            .catch((err) => {
                toast(err);
            })
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </label>
                        <ul
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {links}
                            {
                                user && private_links
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Home<span className="text-purple-600">Hero</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        {links}
                        {
                            user && private_links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* theme toggle */}
                    <div className="mr-3">
                        <label className="swap swap-rotate cursor-pointer">
                            {/* this hidden checkbox controls the swap */}
                            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

                            {/* moon icon (shown when checked) */}
                            <svg className="swap-on fill-current w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M21.64 13a9 9 0 11-9.63-9.63 7 7 0 109.63 9.63z" />
                            </svg>

                            {/* sun icon (shown when unchecked) */}
                            <svg className="swap-off fill-current w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5M12 7a5 5 0 100 10 5 5 0 000-10z" />
                            </svg>
                        </label>
                    </div>
                    {
                        !user ?
                            <div className='flex gap-3 pr-5'>
                                <button className='btn-primary px-2 bg-black text-white rounded py-1'onClick={()=>Navigate('/login')}>Login</button>
                                <button className='btn-primary px-2 bg-black text-white rounded py-1' onClick={()=>Navigate('/signup')}>SignUp</button>
                            </div>
                            :
                            <button className='btn-primary px-2 bg-red-800 text-white rounded py-1' onClick={handleLogout}>Logout</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;