import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import SearchPage from "./Components/SearchPage";
import ResultPage from "./Components/ResultPage";
import LandingPage from "./Components/LandingPage";
import SavedRecipes from "./Components/SavedRecipes";
import {Profile} from './Components/Profile';
import React, { useState } from "react";
import randomRecipes from'./randomRecipes.json';
import Instructions from './Components/Instructions';
import SearchBar from './Components/SearchBar';
import RecipeGrid from './Components/RecipeGrid';


function App() {
  
  return (
    <BrowserRouter>
      <div>
        {/* The React Router that makes the HTML above work */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path ="/saved" element={<SavedRecipes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;