import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import { AuthContext } from '../../context/Context';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const getLinkStyle = ({ isActive }) => {
    return {
        color: isActive ? '#8b5cf6' : '',
        borderBottom: isActive ? '2px solid #8b5cf6' : 'none',
        paddingBottom: '2px',
        transition: 'all 0.3s ease'
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


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then(() => {
                        toast("Logout Succesfull")
                        Navigate("/");
                    })
                    .catch((err) => {
                        toast(err);
                    })
                Swal.fire({
                    title: "logged  out",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div>
           
            <div className="w-full bg-base-100 shadow-sm mb-1">
                <div className="navbar w-full max-w-full sm:max-w-7xl mx-auto px-4">
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
                    <a className="btn btn-ghost text-2xl font-bold flex items-center gap-2 px-0 hover:bg-transparent">
                        <div className="flex items-center justify-center leading-none select-none">
                   
                            <span className="text-2xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Home
                            </span>

                      
                            <span className="text-xs font-semibold text-base-content/70 mt-1">
                                Hero
                            </span>
                        </div>

                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        {links}
                        {
                            user && private_links
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    {/* theme toggle */}
                    <div>
                        <button
                            onClick={toggleTheme}
                            className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`}
                            aria-pressed={theme === 'dark'}
                            aria-label="Toggle theme"
                            title="Toggle theme"
                        >
                            <span className="moon" aria-hidden="true" />
                        </button>
                    </div>
                    {
                        !user ?
                            <div className='flex gap-2'>
                                <button className='btn-primary-custom btn-sm' onClick={() => Navigate('/login')}>Login</button>
                                <button className='btn-secondary-custom btn-sm' onClick={() => Navigate('/signup')}>SignUp</button>
                            </div>
                            :
                            <button className='btn-danger-custom btn-sm' onClick={handleLogout}>Logout</button>
                    }
                </div>
            </div>
        </div>
        </div>
    );
};

export default Navbar;