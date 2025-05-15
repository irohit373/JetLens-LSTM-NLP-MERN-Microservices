'use client'

import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage({}) {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            const res = await axios.post('/api/users/verifyemail/', {token});
            console.log(res.data);
            if (res.data.success) {
                setVerified(true);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log(error.response.data);
            setError(true);
        }

    }
    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.href.split("=")[1];
        setToken(urlToken || "");
        console.log(urlToken);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Verify Email</h1>
            {verified && <p className='text-green-500'>Email verified successfully!</p>}
            {error && <p className='text-red-500'>Error verifying email. Please try again.</p>}
            <Link href="/login" className='mt-4 text-blue-500'>Go to Login</Link>
        </div>
    )
}

