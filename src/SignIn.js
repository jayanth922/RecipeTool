import React, { useState } from 'react';
import { auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';  // Ensure you have this CSS file for styles

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/home'); // Navigate to home page on successful sign up
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        alert(error.message); // Show error message to the user
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/home'); // Navigate to home page on successful sign in
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        alert(error.message); // Show error message to the user
      });
  };

  return (
    <div className="signin-container">
      <h1>Welcome Back!</h1>
      <form className="signin-form">
        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" onClick={handleSignIn} className="signin-btn">Sign In</button>
        <button type="submit" onClick={handleSignUp} className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignIn;
