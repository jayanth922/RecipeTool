import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import AddRecipe from './AddRecipe';
import { getAuth, signOut } from 'firebase/auth';
import RecipeDetails from './RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
