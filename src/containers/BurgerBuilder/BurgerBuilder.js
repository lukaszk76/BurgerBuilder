import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    meat: 1.1,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    
    state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
    };

    componentDidMount() {
        axios.get('https://react-burger-builder-f0433-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data, error: false});
        })
        .catch(error => {
            this.setState({error: true})
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert("Continue order...");
        this.setState({loading: true});
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
        .then( response => {
            this.setState({loading: false, purchasing: false});
        } )
        .catch( error => {
            this.setState({loading: false, purchasing: false});
        } );
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
        
        let displayedItem = null;
        let burger = this.state.error ? <p>Can't load ingredients...</p> : <Spinner/>;
        
        if (this.state.ingredients) {
            burger = 
            <Aux>
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

            displayedItem =  <OrderSummary 
                ingredients={this.state.ingredients}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>;
        }

        if (this.state.loading) {
            displayedItem = <Spinner/>;
        };

        return(
            <Aux>
                
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    
                   {displayedItem}
                
                </Modal>

                {burger}                
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
