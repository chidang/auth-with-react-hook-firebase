import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';


class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render(){
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClick={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
} 
    
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);
