'use client'
import { useState } from 'react';
import Image from 'next/image';
import login from '/public/Exclude.svg'


const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <button onClick={handleLogout} className="login">
            <p>{isLoggedIn ? 'Вход' : 'Выход'}</p>
            <Image src={login} alt='Login'></Image>
        </button>
    );
};
export default Login;