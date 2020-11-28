import React from 'react';
import Aux from "../../../hoc/Aux"
import Button from "../../UI/Button/Button";
//import classes from './orderSummary.module.css';

const orderSummary = ( props ) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => 
        (<li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
        </li>));

    return(
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
                buttonType="Danger"
                clicked={props.cancelOrder}>
                    CANCEL
            </Button>
            <Button 
                buttonType="Success"
                clicked={props.continueOrder}>
                    CONTINUE
            </Button>
        </Aux>
    );
};

export default orderSummary;