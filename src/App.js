import './App.css';
import React, { useState } from 'react'

const Recipe = ({recipe, readyToEat, prepare, eat}) => {

  return (
    <div className="recipe">
      <img src={recipe.image} />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {(readyToEat) ? <button id="eat" onClick={ () => eat(recipe.id) }>eat!</button> : <button onClick={ () => prepare(recipe.id) }>Prepare Dish</button> }
    </div>
  );
}

const Recipes = ({recipes, readyToEat, prepare, eat}) => {
  console.log(recipes);
  return (<div className='recipes'>
  {( recipes.map(recipe => <Recipe key={(readyToEat ? "recipe" : "eat") + recipe.id}
                                   recipe={recipe} 
                                   readyToEat={readyToEat} 
                                   prepare={prepare}
                                   eat={eat} />) 
  )}
  </div>);
}

const	RecipesDone = ({recipes, eat}) => {
  return (
    <Recipes recipes={recipes} readyToEat={true} eat={eat} />
  )
}

function MyKitchen() {
  const [recipes, setRecipes] = useState(myRecipes);
  const [recipesDone, setRecipesDone] = useState([]);
  const [doneCount, setDoneCount] = useState(0);

  const prepare = (id) => {
    const chosenRecipe = myRecipes.filter((val) => val.id===id);
    setRecipes(recipes.filter(item => item.id !== id));
    setRecipesDone((recipesDone) => [...recipesDone, chosenRecipe[0]]);
    setDoneCount(doneCount+1);
  }

  const eat = (id) => {
    const chosenRecipe = myRecipes.filter((val) => val.id===id);
    setRecipesDone(recipesDone.filter(item => item.id !== id));
    setRecipes((recipes) => [...recipes, chosenRecipe[0]]);
    setDoneCount(doneCount-1);
  }

  return (
    <div className="App">
      <h1>Recipes</h1>
      <Recipes recipes={recipes} prepare={prepare} />

      <h1>Ready to EAT!</h1>
      <h2>Recipes Made: {doneCount}</h2>
      <RecipesDone recipes={recipesDone} eat={eat} />
    </div>
  );
}

var currentId = 1;
class RecipeObject {
  constructor (title, description, image) {
    this.id = currentId++;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}

const myRecipes = [
  new RecipeObject("Pad Thai", "stir-fry dish, mix all ingredients together", "https://glebekitchen.com/wp-content/uploads/2016/11/easypadthaibowltop-1-500x500.jpg"),
  new RecipeObject("Pho", "slow-cooked soup", "https://www.fodmapeveryday.com/wp-content/uploads/2017/06/Pho-closeup-copy-855x570.jpg"),
  new RecipeObject("Chop Suey", "5 minute stir fry,add each vegetable in the order in which they cook.", "https://kirbiecravings.com/wp-content/uploads/2020/04/chop-suey-5.jpg")
];

export default MyKitchen;
