import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null); // State to store response message

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/signup", {
                email,
                password
            });
            setMessage(JSON.stringify(response.data)); // Store response data in message state
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred"); // Handle errors
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
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
            {message && <h1>{message}</h1>} 
            <Link to="/login">Login</Link>
        </div>
    );
}
