import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout, getUser} from './../../ducks/reducer';
import './nav.css';
import home from './home_logo.png';
import newpost from './new_logo.png';
import shutdown from './shut_down.png';

class Nav extends Component {
    
    componentDidMount() {
        this.props.getUser();
    }
    
    render() {
        let {pathname} = this.props.location;
        let {profile_pic} = this.props.reducer.user;
        if (pathname !== '/') {
            return (
            
            <div className='nav'>
                <div className='profile-pic-container'>
                    <div className='profile-pic' style={{backgroundImage: `url(${profile_pic})`}}></div>
                </div>
                <div className='nav-button-bar'>
                    <a href='/#/dashboard'><img className='nav-button-img' src={home} alt='home' /></a>
                    <a href='/#/new'><img className='nav-button-img' src={newpost} alt='new post' /></a>
                </div>
                <a href='/#'><img id='nav-button-img-logout' src={shutdown} alt='logout' onClick={() => this.props.logout()}/></a>
            </div>)
        } else {
            return (null)
        }
    }
}

const mapState = (reduxState) => {
    return reduxState
};

export default withRouter(connect(mapState, {logout, getUser})(Nav));