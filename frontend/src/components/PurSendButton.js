import React from "react"
export function PurchaseSendButton(){
    const handleClick = () => {
        console.log('Button clicked');
      };
    return (
        <button onClick={handleClick}>Send</button>
    );
}