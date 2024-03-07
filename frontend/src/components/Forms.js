import React, { useState } from "react"
import { useEffect } from 'react';
import { Categories } from './Categories';
import { PurchaseInputs } from './PurchaseInputs';
import * as ReactDOMClient from 'react-dom/client';
import { Purchases } from "./Purchases";

/*
-When we open the purchase form, we want to fetch the category list.
 */

export function PurchaseForm(){
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/categories/")
    .then((response) => {
      return response.json();
    }).then((result)=>{
      setCategories(result.categories);
    });
  },[]);

  const[formData, setFormData] = useState({
    desc_text: '',
    amt_num: '',
    date_of_purchase: '',
    category: ''
  })

  function onChangeHandler(event){
    setFormData(()=>({
      ...formData,
      [event.target.name]: event.target.value
    }))
  }

  function sendData(event){
    event.preventDefault();
    fetch(`/purchases/`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
  })
  .then((response) => {
      return response.json();
  })
  .then((result) => {
    const purList = ReactDOMClient.createRoot(document.getElementById("purchase_list"));
    purList.render(<Purchases purchases={result}/>);
  })
  }

  return(
    <form id = "purchaseform" style={{display : 'block'}}>
      <label htmlFor="desctext">Description: </label>
      <input type = "text"  id = "description" name = "desc_text"onChange = {onChangeHandler}></input>
      <br></br>
      <label htmlFor="amt">Amount: </label>
      <input type = "number"  id = "amt" name = "amt_num" onChange = {onChangeHandler}></input>
      <br></br>
      <label htmlFor="date">Date: </label>
      <input type = "date"  id = "date" name = "date_of_purchase" onChange = {onChangeHandler}></input>
      <br></br>
      <strong>Categories</strong>
      <br></br>
      <PurchaseInputs categories = {categories} onChange = {onChangeHandler}/>
      <input type="submit" id="purSend" value="Send" onClick={sendData}></input>
    </form>
  );
}

export function CategoryForm(){

  const[formData, setFormData] = useState({
    cat_name: '',
    budget_num: ''
  })
  function onChangeHandler(event){
    setFormData(()=>({
      ...formData,
      [event.target.name]: event.target.value
    }))
  }

  function sendData(event){
    event.preventDefault();
    fetch(`/categories/`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const catList = ReactDOMClient.createRoot(document.getElementById("category_list"));
      catList.render(<Categories categories={result}/>);
    })
  }
  return(
    <form id = "categoryform" style={{display : 'block'}} >
      <label htmlFor="catname">Category Name: </label>
      <input type = "text"  id = "catname" name = "cat_name" onChange = {onChangeHandler} ></input>
      <br></br>
      <label htmlFor="budget">Budget: </label>
      <input type = "number"  id = "budget" name = "budget_num" onChange = {onChangeHandler}></input>
      <br></br>
      <input type = "submit" id = "catsend" value="Send" onClick = {sendData}></input>
      </form>
    );
}