"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import classes from "./page.module.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get(
        "https://api.punkapi.com/v2/beers?page=1"
      );
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);
  console.log(recipes);

  return (
    <div>
      <h1>Recipes</h1>
      <ul className={classes.list}>
        {recipes.map((recipe) => (
          <li className={classes.item} key={recipe.id}>
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
              height={300}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => console.log("click")}>Add to Cart</button>
    </div>
  );
};

export default RecipeList;
