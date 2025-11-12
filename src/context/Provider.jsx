import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../firebase/firebase.config';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';



const Provider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


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


    // component mount এ fetch
    useEffect(() => {
        fetchServices();
    }, []);
    const info = {
        createUser,
        signInUser,
        googleUser,
        user,
        loading,
        setServices,
        services,
    }


    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;