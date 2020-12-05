import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';

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
            totalPrice: 4,
            purchasable: false,
            purchasing: false
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert("Continue order...");
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "John Do",
                adress: {
                    street: "teststreet 2",
                    zipCode: "12-234",
                    city: "Testcity"
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
        .then( response => console.log(response) )
        .catch( error => console.log(error) );
    }
    
    updatePuchasable = (ingredients) => {
    
        const sum = Object.keys(ingredients)
        .map(ingredient => { 
            return ingredients[ingredient]; 
        })
        .reduce((sum,el) => {
            return sum + el
        },0);

        
        this.setState({purchasable: sum > 0});
        
    }
    
    addIngredient = (type) => {
        const oldAmount = this.state.ingredients[type];
        const newAmount = oldAmount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newAmount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePuchasable(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldAmount = this.state.ingredients[type];
        
        if (oldAmount <=0 ) {
            return;
        };

        const newAmount = oldAmount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newAmount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceAddition;
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePuchasable(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        };
        
        return(
            <Aux>
                
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelOrder={this.purchaseCancelHandler}
                        continueOrder={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                
                <Burger ingredients = {this.state.ingredients}/>
                
                <BuildControls 
                    less={this.removeIngredient} 
                    more={this.addIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}    
                />

            </Aux>
        );
    }
}

export default BurgerBuilder;
