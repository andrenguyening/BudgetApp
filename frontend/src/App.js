import './App.css';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Categories } from './components/Categories';
import { Purchases } from './components/Purchases';
import { CategoryForm } from './components/Forms';
import { PurchaseForm } from './components/Forms';

/*THINGS TO KEEP IN MIND*/
/* 
  -budget will reset every month
      example:
      -if you go over budget in march for food, every purchase of food after will be red only in march
      -if you buy some food in april, you are not over budget anymore, because the budget reset.
      how to approach:
      -in db keep track of each month
      -month has a list of categories

*/

function AddButtons(){
  const [showPurchaseForm, setPurchaseForm] = useState(false);
  const [showCategoryForm, setCategoryForm] = useState(false);
  function toggleForm() {
    if (showPurchaseForm) {
      setPurchaseForm(false);
    } else {
      setPurchaseForm(true);
      setCategoryForm(false);
    }
  }
  function toggleForm1() {
    
    if (showCategoryForm) {
      setCategoryForm(false);
    } else {
      setCategoryForm(true);
      setPurchaseForm(false);
    }
  }
  return(
  <div>
    <button id = "purchasebutton" onClick={toggleForm}>Add New Purchase</button>
    <button id = "catbutton" onClick={toggleForm1}>Add New Category</button>
    {showPurchaseForm && <PurchaseForm />}
    {showCategoryForm && <CategoryForm />}
  </div>
  );
}

const App = () => {
    
  const [categories, setCategories] = useState([]);
  const [purchases, setPurchases] = useState([]);
  
  useEffect(() => {
    fetch("/categories/").then(response => 
      response.json().then(data =>{
        setCategories(data.categories);
      })
    );
  }, []);
  useEffect(()=>{
    fetch("/purchases/").then(response => 
      response.json().then(data =>{
        setPurchases(data.purchases)
      })
    );
  }, []);
  
  return(
    <div>
      <h1>Budget Tracker</h1>
      <AddButtons />
      <h2>Categories</h2>
      <Categories categories= {categories}/>
      <h2>Purchases</h2>
      <Purchases purchases = {purchases} categories= {categories}/>
      <br></br>
    </div>
  );
};

export default App;
