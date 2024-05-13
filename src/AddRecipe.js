import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    RecipeID: '', RecipeName: '', Ingredients: '', CookTime: '', Cuisine: '', Course: '', Diet: '', Instructions: '', URL: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://41tfnt6hx6.execute-api.ap-south-1.amazonaws.com/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe)
      });
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      alert('Recipe added successfully!');
      navigate('/home');
    } catch (error) {
      alert(`Failed to add recipe: ${error.message}`);
    }
  };

  const handleReturnHome = () => {
    navigate('/home'); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className="add-recipe-form">
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(recipe).map(key => (
          <div className="input-group" key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              name={key}
              type={key === 'RecipeID' ? 'number' : 'text'}  // Set input type to number for RecipeID
              value={recipe[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit Recipe</button>
        <button type="button" className="home-btn" onClick={handleReturnHome}>Return to Home</button>
      </form>
    </div>
  );
}

export default AddRecipe;


