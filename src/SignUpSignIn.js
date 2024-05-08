import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase-config';
import { Form, Button, Card, Container } from 'react-bootstrap';
import './App.css';
import './styles.css';

function SignUpSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
          <Form onSubmit={handleAuth}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label
              ><Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
            <div className="w-100 text-center mt-2">
              <Button variant="link" onClick={() => setIsSignIn(!isSignIn)}>
                {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignUpSignIn;
