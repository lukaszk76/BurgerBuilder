import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    meat: 1.1,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    
    state = {
            ingredients:{
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
    };
    
    
    addIngredient = (type) => {
        const oldAmount = this.state.ingredients[type];
        const newAmount = oldAmount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newAmount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }

    removeIngredient = (type) => {
        const oldAmount = this.state.ingredients[type];
        let newAmount = oldAmount - 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice;
        
        if (newAmount < 0) {
            newAmount = 0;
        } else {
            newPrice = oldPrice - priceAddition;
        }
        
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newAmount;
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }

    render() {
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls less={this.removeIngredient} more={this.addIngredient}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
