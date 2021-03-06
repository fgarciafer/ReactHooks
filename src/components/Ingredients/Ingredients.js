import React, { useReducer, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw  new Error('Should not get there!');
  }
}


const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients});
    //setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-e0683.firebaseio.com/ingredientes.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      setIsLoading(false);
      return response.json()
    }).then(responseData => {
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
      //setUserIngredients(prevIngredients => [...prevIngredients, {id: responseData.name, ...ingredient}]);
    });
  };

  const removeItenHandle = id => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-e0683.firebaseio.com/ingredientes/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false);
      dispatch({type: 'DELETE', id: id});
      //setUserIngredients(prevIngredients => prevIngredients.filter(ing => ing.id !== id));
    }).catch(error => {
      setError(error.message);
    });
  }

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItenHandle}/>
      </section>
    </div>
  );
}

export default Ingredients;
