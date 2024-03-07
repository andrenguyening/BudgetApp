import React from "react"

export function CategoryInput(props){
    return (
        <div>
            <input type = "radio"  id = {props.name} name = {props.name} ></input>
            <label htmlFor={props.name}>{props.name}</label>
            <br></br>
        </div>
    )
}