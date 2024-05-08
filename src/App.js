import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase-config';
import SignUpSignIn from './SignUpSignIn';
import AddRecipe from './AddRecipe';
import SearchRecipes from './SearchRecipes';
import { Container, Navbar, Button } from 'react-bootstrap';
import './App.css'; // Ensure App.css is correctly imported

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setCurrentUser(null);
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <Router>
            <Navbar className="navbar-custom" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Recipe Recommender</Navbar.Brand>
                    {currentUser && (
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                    )}
                </Container>
            </Navbar>
            <Container>
                <Routes>
                    <Route path="/" element={!currentUser ? <SignUpSignIn /> : <Navigate to="/home" />} />
                    <Route path="/home" element={currentUser ? 
                        <div>
                            <div className="section">
                                <AddRecipe />
                            </div>
                            <div className="section">
                                <SearchRecipes />
                            </div>
                        </div>
                        : <Navigate to="/" />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
