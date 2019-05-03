import React, {Component} from 'react';
import './form.css';
import noimage from './no_image.jpg';
import {connect} from 'react-redux';
import {createPost} from './../../ducks/reducer';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            image: '',
            content: ''
        };

        this.createPost = this.createPost.bind(this);
    }

    async createPost() {
        let {title, content, image} = this.state;
        let {id} = this.props.reducer.user;
        let post = {id, title, content, image};
        await this.props.createPost(post);
        this.setState({title: '', image: '', content: ''});
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div className='form'>
                <h2 className='form-title'>New Post</h2>
                <div className='form-input'>
                    <p>Title:</p>
                    <input value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                </div>
                <div className='form-image' style={{backgroundImage: `url(${this.state.image || noimage})`}}></div>
                <div className='form-input'>
                    <p>Image URL:</p>
                    <input value={this.state.image} onChange={e => this.setState({image: e.target.value})}/>
                </div>
                <div className='form-textbox'>
                    <p>Content:</p>
                    <textarea value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
                </div>
                <button className='post-button' onClick={() => this.createPost()}>Post</button>



            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
};

export default connect(mapState, {createPost})(Form);