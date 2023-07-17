"use client";

import { useEffect, useState } from "react";
// import { useStore } from "zustand";

import axios from "axios";
import Image from "next/image";
import classes from "./page.module.css";

import { create } from "zustand";

export const useStore = create((set) => ({
  recipes: [],
  setRecipes: (newRecipes) =>
    set((state) => {
      return { recipes: [...state.recipes, ...newRecipes] };
    }),
  page: 1,
  setPage: () => set((state) => ({ page: state.page + 1 })),
}));

const RecipeList = () => {
  // const [recipes, setRecipes] = useState([]);
  const recipes = useStore((state) => state.recipes);
  const setRecipes = useStore((state) => state.setRecipes);
  const deleteRecipe = useStore((state) => state.deleteRecipe);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const page = useStore((state) => state.page);
  const setPage = useStore((state) => state.setPage);

  const handleDelete = () => {
    selectedRecipes.forEach((recipeId) => {
      deleteRecipe(recipeId);
    });
    setSelectedRecipes([]);
  };

  const handleRecipeClick = (recipeId) => {
    const isSelected = selectedRecipes.includes(recipeId);

    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.punkapi.com/v2/beers?page=${page}`
        );
        const data = await response.json();
        console.log(data);
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, [page, setRecipes]);

  console.log(recipes);

  return (
    <div>
      <h1>Recipes</h1>
      {selectedRecipes.length > 0 && (
        <button onClick={handleDelete}>Видалити</button>
      )}
      <button onClick={() => setPage()}>add</button>

      <ul className={classes.list}>
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            onContextMenu={() => handleRecipeClick(recipe.id)}
            onClick={() => handleRecipeClick(recipe.id)}
            className={`${classes.recipe} ${
              selectedRecipes.includes(recipe.id) ? "selected" : ""
            } ${classes.item}`}
          >
            <div className={classes.thumb}>
              <h2>{recipe.name}</h2>
              <p>{recipe.style}</p>
              <p>{recipe.abv}</p>
              <p>{recipe.ibu}</p>
            </div>
            <Image
              src={recipe.image_url}
              alt={recipe.name}
              width={100}
              height={393}
              priority={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
