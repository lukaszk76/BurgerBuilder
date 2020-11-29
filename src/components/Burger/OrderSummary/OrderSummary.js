import React, { Component } from 'react';
import Aux from "../../../hoc/Aux"
import Button from "../../UI/Button/Button";
//import classes from './orderSummary.module.css';

class OrderSummary extends Component {

    render() { 
        
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingKey => 
        (<li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
        </li>));

        return(
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button 
                    buttonType="Danger"
                    clicked={this.props.cancelOrder}>
                        CANCEL
                </Button>
                <Button 
                    buttonType="Success"
                    clicked={this.props.continueOrder}>
                        CONTINUE
                </Button>
            </Aux>
        );
    };
};

export default OrderSummary;