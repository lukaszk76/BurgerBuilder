import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    drawerToggleHandler = () => {
        this.setState((previousState) => {
            return({showSideDrawer: !previousState.showSideDrawer})
        });
    }

    render()  {  
        return(            
            <Aux>
                <Toolbar 
                    drawerToggleClicked = {this.drawerToggleHandler}/>
                <SideDrawer 
                    closed = {this.closeSideDrawerHandler}
                    open = {this.state.showSideDrawer}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
 }

export default Layout;