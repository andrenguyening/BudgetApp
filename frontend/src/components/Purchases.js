import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';


export const Purchases = ({purchases}) => {
    //getting map of keys to values where the keys are the yearmonthcategorynaeme and values are the budget
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("/categories/").then(response => 
          response.json().then(data =>{
            setCategories(data.categories);
          })
        );
      }, []);
    const keyMap = new Map();
    for(let i = 0 ; i < purchases.length; i++){
        const dateArray = purchases[i].date.split("-");
        var key = dateArray[0]+dateArray[1]+purchases[i].category;
        console.log(dateArray[0]+dateArray[1]+purchases[i].category);
        var budget;
        for (let j = 0; j < categories.length ;j++){
            if(categories[j].name === purchases[i].category){
                budget = categories[j].budget;
            }
        }
        if(keyMap.has(key) === false){
            keyMap.set(key, budget)
        }
    }
    return (
    <div id ="purchase_list">
    <ul >
        {purchases.slice(0).reverse().map(purchase => {
            const dateArray = purchase.date.split("-");
            var key = dateArray[0]+dateArray[1]+purchase.category;
            keyMap.set(key, keyMap.get(key)-purchase.amount);
            if(keyMap.get(key) < 0){
                return (
                    <li style={{backgroundColor: "red"}}key={purchase.desc}>[{purchase.date}] {purchase.desc} ${purchase.amount} ({purchase.category})</li>
                )
            }
            else{
                return (
                    <li key={purchase.desc}>[{purchase.date}] {purchase.desc} ${purchase.amount} ({purchase.category})</li>
                )
            }
        }).reverse()}
    </ul>
    </div>)
    ;
}