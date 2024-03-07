import React from "react"

export function PurchaseInputs( {categories, onChange}  ){
    return (
            categories.map((category) => {
                return (
                    <>
                    <input type = "radio"  id = {category.name} name = "purchasecategories"  value={category.name} key={category.id} onChange = {onChange}></input>
                    <label htmlFor={category.name}>{category.name}</label>
                    <br></br>
                    </>
                )
            })
    )
}