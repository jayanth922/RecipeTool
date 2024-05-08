import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import './styles.css';
import './App.css';

function SearchRecipes() {
    const [searchParams, setSearchParams] = useState({ ingredients: '', dietType: '', recipes: [] });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const getRecipes = async () => {
        let query = `ingredients=${encodeURIComponent(searchParams.ingredients)}`;
        if (searchParams.dietType) {
            query += `&dietType=${encodeURIComponent(searchParams.dietType)}`;
        }

        try {
            const response = await fetch(`https://nxstpsl9x3.execute-api.ap-south-1.amazonaws.com/recipes?${query}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            const data = await response.json();
            setSearchParams(prev => ({ ...prev, recipes: data }));
        } catch (error) {
            console.error('Error retrieving recipes:', error);
            alert('Failed to retrieve recipes');
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="card-custom">
                <Card.Header>Find Recipes by Ingredients</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ingredients separated by commas"
                                name="ingredients"
                                value={searchParams.ingredients}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Diet Type</Form.Label>
                            <Form.Select
                                name="dietType"
                                value={searchParams.dietType}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Any Diet Type</option>
                                <option value="vegan">Vegan</option>
                                <option value="gluten-free">Gluten-Free</option>
                                <option value="ketogenic">Ketogenic</option>
                            </Form.Select>
                        </Form.Group>
                        <Button onClick={getRecipes} className="btn-primary mt-3">Search Recipes</Button>
                    </Form>
                    {searchParams.recipes.length > 0 && (
                        <div className="mt-3">
                            {searchParams.recipes.map((recipe, index) => (
                                <Card key={index} className="mt-3 card-custom">
                                    <Card.Body>
                                        <Card.Title>{recipe.Name}</Card.Title>
                                        <Card.Text><strong>Ingredients:</strong> {recipe.Ingredients.join(', ')}</Card.Text>
                                        <Card.Text><strong>Instructions:</strong> {recipe.Instructions}</Card.Text>
                                        <Card.Text><small>Contributor: {recipe.UserName}</small></Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SearchRecipes;
