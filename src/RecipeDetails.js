import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://41tfnt6hx6.execute-api.ap-south-1.amazonaws.com/recipe/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setError(`Failed to fetch recipe details: ${error.message}`);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`https://41tfnt6hx6.execute-api.ap-south-1.amazonaws.com/reviews/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                const reviewData = await response.json();
                console.log('Fetched reviews:', reviewData);
                setReviews(reviewData);
                console.log('Updated reviews state:', reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError(`Failed to fetch reviews: ${error.message}`);
            }
        };
        console.log('Component is mounting or id has changed:', id);
        fetchRecipeDetails();
        fetchReviews(); // Make sure this is called here to ensure it triggers on mount
    }, [id]); // Ensures fetches are re-triggered when the recipe ID changes

    const handleAddReview = async () => {
        const reviewData = {
            RecipeID: id,
            UserName: 'User', // Adjust based on actual user identity
            Comment: newReview
        };
        try {
            const response = await fetch('https://41tfnt6hx6.execute-api.ap-south-1.amazonaws.com/add-review', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(reviewData)
            });
            if (response.ok) {
                setReviews([...reviews, {...reviewData, ReviewID: 'temp' + Date.now()}]); // Temporarily assign a unique ID
                setNewReview('');
            } else {
                const error = await response.json();
                throw new Error(`Failed to add review: ${error.message}`);
            }
        } catch (error) {
            console.error('Error adding review:', error);
            setError(`Failed to add review: ${error.message}`);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h1>{recipe.RecipeName}</h1>
            <p><strong>Ingredients:</strong> {recipe.Ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.Instructions}</p>
            <p><strong>Cook Time:</strong> {recipe.CookTime} minutes</p>
            <p><strong>Diet:</strong> {recipe.Diet || 'Not specified'}</p>
            <p><strong>Cuisine:</strong> {recipe.Cuisine || 'Not specified'}</p>
            <p><strong>Course:</strong> {recipe.Course || 'Not specified'}</p>
            <a href={recipe.URL} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
            <div>
                <h2>Reviews</h2>
                {reviews.map(review => (
                    <div key={review.ReviewID}>
                        <p>{review.UserName}: {review.Comment}</p>
                    </div>
                ))}
                <textarea 
                    value={newReview} 
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write a review..."
                    className="review-textarea"
                ></textarea>
                <button onClick={handleAddReview} className="add-review-btn">Add Review</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/home">Back to Home</Link>
            </div>
        </div>
    );
}

export default RecipeDetails;
