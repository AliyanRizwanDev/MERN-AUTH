import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [login, setLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Submitting login form");
        try {
            const response = await axios.post("http://localhost:8000/user/login", {
                email,
                password
            });
            const responseData = response.data;
            setMessage(JSON.stringify(responseData)); // Store response data in message state
            localStorage.setItem("user", JSON.stringify(responseData));
            setLogin(true);
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred"); // Handle errors
        }
    };

    useEffect(() => {
        const check = JSON.parse(localStorage.getItem("user"));
        if (check?.email && check?.token) {
            setLogin(true);
        }
    }, []);

    return (
        <div>
            {!login ? (
                <div>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"
                        />
                        <input 
                            type="password"  
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <h1>{message}</h1>
                    <Link to="/signup">Sign up</Link>
                </div>
            ) : (
                <Logout setLogin={setLogin}/>
            )}
        </div>
    );
}
