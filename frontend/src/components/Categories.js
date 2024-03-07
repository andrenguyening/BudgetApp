import React from "react"

export const Categories = ({ categories }) => {

    return (
    <div id= "category_list">
        <ul>
            {categories.map(category => {
                return (
                    <li key={category.name} id = {category.id}>{category.name} : ${category.budget}</li>
                )
            })}
        </ul>
    </div>)
    ;
}