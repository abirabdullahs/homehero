import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../firebase/firebase.config';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';



const Provider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    // theme: 'light' | 'dark' - persisted in localStorage
    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
        } catch (e) {
            // ignore
        }
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }


    const provider = new GoogleAuthProvider();

    const googleUser = () => {
        return signInWithPopup(auth, provider);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return (() => {
            unsubscribe();
        })

    }, [])


    // apply theme to document and persist
    useEffect(() => {
        try {
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute('data-theme', theme);
            }
            localStorage.setItem('theme', theme);
        } catch (e) {
            // ignore
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }




    // API fetch function
    const fetchServices = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/services`); // তোমার API URL
            setServices(res.data); // context state update
            setLoading(false);
        } catch (error) {
            console.error("Error fetching services:", error);
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/bookings`); // তোমার API URL
            setBookings(res.data); // context state update
            setLoading(false);
        } catch (error) {
            console.error("Error fetching services:", error);
            setLoading(false);
        }
    };




   


    // component mount এ fetch
    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        fetchBookings();
    }, []);







    const info = {
        createUser,
        signInUser,
        googleUser,
        user,
        loading,
        theme,
        toggleTheme,
        setServices,
        services,
        bookings,
    }


    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;