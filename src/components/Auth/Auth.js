import React, {Component} from 'react';
import './auth.css';
import logo from './helo_logo.png';
import {connect} from 'react-redux';
import {registerUser, loginUser} from './../../ducks/reducer';

class Auth extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    watchUsername(val) {
        this.setState({username: val});
    }

    watchPassword(val) {
        this.setState({password: val});
    }

    async registerUser(username, password) {
            let options = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',1,2,3,4,5,6,7,8,9,0];
            let imageArr = [];
            for (var i = 0; i < 8; i++) {
                let index = Math.floor(Math.random() * 37);
                imageArr.push(options[index]);
            };
            let profile_pic_string = imageArr.join('');
        let profile_pic = `https://robohash.org/${profile_pic_string}`
        let user = {username, password, profile_pic}
        await this.props.registerUser(user);
        this.setState({username: '', password: ''});
        this.props.history.push('/dashboard');
    }

    async loginUser(username, password) {
        await this.props.loginUser({username, password});
        this.setState({username: '', password: ''});
        this.props.history.push('/dashboard');
    }

    render() {
        let {username, password} = this.state;
        return (
            <div className='auth'>
                <div className='login-frame'>
                    <img className='logo' src={logo} alt='helo-logo' />
                    <h1 className='title'>Helo</h1>
                    <div className='login-input-field'>
                        <p>Username:</p><input value={username} onChange={e => this.watchUsername(e.target.value)}/>
                    </div>
                    <div className='login-input-field'>
                        <p>Password:</p><input value={password} onChange={e => this.watchPassword(e.target.value)}/>
                    </div>
                    <div className='auth-buttons'>
                        <button className='auth-button' onClick={() => this.loginUser(username, password)}>Login</button>
                        <button className='auth-button' onClick={() => this.registerUser(username, password)}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
};

export default connect(mapState, {registerUser, loginUser})(Auth);