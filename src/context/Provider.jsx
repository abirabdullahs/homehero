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
    const [authLoading, setAuthLoading] = useState(true); // Auth state loading
    const [loading, setLoading] = useState(false); // Data loading
    // theme: 'light' | 'dark' - persisted in localStorage
    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
        } catch {
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
            setAuthLoading(false); // Auth check is done
        })

        return (() => {
            unsubscribe();
        })

    }, [])


    useEffect(() => {
        try {
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute('data-theme', theme);
            }
            localStorage.setItem('theme', theme);
        } catch {
            // ignore
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }




    // API fetch function
    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/services`);
            setServices(res.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/bookings`);
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    // fetch services for a specific provider (by email)
    // Does NOT manipulate global loading state - let caller manage their own loading
    const fetchServicesByEmail = async (email) => {
        if (!email) return [];
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/services/${email}`);
            return res.data || [];
        } catch (error) {
            console.error("Error fetching services by email:", error);
            return [];
        }
    };

    // fetch bookings for a specific user by email
    // Does NOT manipulate global loading state - let caller manage their own loading
    const fetchBookingsByEmail = async (email) => {
        if (!email) return [];
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/bookings/${email}`);
            return res.data || [];
        } catch (error) {
            console.error("Error fetching bookings by email:", error);
            return [];
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
        authLoading, // Use authLoading for PrivateRoute, not data loading
        loading, // Data loading state
        theme,
        toggleTheme,
        setLoading,
        fetchServices,
        fetchBookings,
        fetchServicesByEmail,
        fetchBookingsByEmail,
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