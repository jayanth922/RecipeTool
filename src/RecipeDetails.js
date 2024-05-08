import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Correct import of useNavigate
import { Card, Button, Container } from 'react-bootstrap';

function RecipeDetails() {
    const [recipe, setRecipe] = useState(null);
    const { recipeId } = useParams(); // Get the recipe ID from the URL parameters
    const navigate = useNavigate(); // Replaces useHistory

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const url = `https://nxstpsl9x3.execute-api.ap-south-1.amazonaws.com/recipes/details/${recipeId}`;
            const response = await fetch(url);
            const data = await response.json();
            setRecipe(data);
        };

        fetchRecipeDetails();
    }, [recipeId]); // Dependency array to trigger effect when recipeId changes

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>{recipe?.Name}</Card.Header>
                <Card.Body>
                    <Card.Title>Ingredients</Card.Title>
                    <Card.Text>{recipe?.Ingredients.join(', ')}</Card.Text>
                    <Card.Title>Instructions</Card.Title>
                    <Card.Text>{recipe?.Instructions}</Card.Text>
                    <Card.Text><small>Contributor: {recipe?.UserName}</small></Card.Text>
                    <Button variant="primary" onClick={() => navigate(-1)}>Back to Search</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default RecipeDetails;
