import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import './styles.css';
import { auth } from './firebase-config';  
import './App.css';

function AddRecipe() {
    const [recipe, setRecipe] = useState({ name: '', ingredients: '', instructions: '', dietType: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const addRecipe = async () => {
        const userEmail = auth.currentUser ? auth.currentUser.email : 'Anonymous';  

        try {
            const response = await fetch('https://nxstpsl9x3.execute-api.ap-south-1.amazonaws.com/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...recipe,
                    ingredients: recipe.ingredients.split(',').map(ingredient => ingredient.trim()), 
                    UserName: userEmail, 
                    dietType: recipe.dietType  
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            const data = await response.json();
            alert('Recipe added successfully!');
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('Failed to add recipe');
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="card-custom">
                <Card.Header>Add a Recipe</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter recipe name"
                                name="name"
                                value={recipe.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="List ingredients separated by commas"
                                name="ingredients"
                                value={recipe.ingredients}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter instructions"
                                name="instructions"
                                value={recipe.instructions}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Diet Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter diet type"
                                name="dietType"
                                value={recipe.dietType}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </Form.Group>
                        <Button onClick={addRecipe} className="btn-primary mt-3">Add Recipe</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddRecipe;
