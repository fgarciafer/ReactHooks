import React, { useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  // const [ inputState, setInputState] = useState({title: '', amount: ''}); 

  const [titleState, setTitleState] = useState('');
  const [amountState, setAmountState] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: titleState, amount: amountState});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={titleState} 
              onChange={event => {
                setTitleState(event.target.value);
              }}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amountState}
              onChange={event => {
                setAmountState(event.target.value);
              }}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
