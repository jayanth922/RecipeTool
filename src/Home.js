import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Home.css';  // Ensure your styles are correctly linked

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [diet, setDiet] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await fetch('https://41tfnt6hx6.execute-api.ap-south-1.amazonaws.com/list');
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError(`Failed to fetch recipes: ${error.message}`);
            }
        }
        fetchRecipes();
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/'); // Redirect to the sign-in page
        }).catch((error) => {
            console.error('Logout failed', error);
        });
    };

    const filteredRecipes = recipes.filter(recipe => 
        recipe.RecipeName.toLowerCase().includes(search.toLowerCase()) &&
        recipe.Cuisine.toLowerCase().includes(cuisine.toLowerCase()) &&
        recipe.Diet.toLowerCase().includes(diet.toLowerCase())
    );

    const goToNewRecipe = () => {
        navigate('/add-recipe');
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-container">
            <div className="header">
                <h1>Recipe Sharing Platform</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="filter-bar">
                <input 
                    type="text" 
                    placeholder="Search recipes..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Filter by cuisine..." 
                    value={cuisine} 
                    onChange={e => setCuisine(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Filter by diet..." 
                    value={diet} 
                    onChange={e => setDiet(e.target.value)} 
                />
            </div>
            <div className="content-area">
                <button className="add-recipe-button" onClick={goToNewRecipe}>
                    Add New Recipe
                </button>
                <div className="recipes-feed">
                    {filteredRecipes.map((recipe) => (
                        <div key={recipe.RecipeID} className="recipe-card">
                            <Link to={`/recipe/${recipe.RecipeID}`} className="recipe-link">
                                <h2>{recipe.RecipeName}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

