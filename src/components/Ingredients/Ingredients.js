import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-e0683.firebaseio.com/ingredientes.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [...prevIngredients, {id: responseData.name, ...ingredient}]);
    });
  };

  const removeItenHandle = id => {
    fetch(`https://react-hooks-update-e0683.firebaseio.com/ingredientes/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      setUserIngredients(prevIngredients => prevIngredients.filter(ing => ing.id !== id));
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItenHandle}/>
      </section>
    </div>
  );
}

export default Ingredients;
