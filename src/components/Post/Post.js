import React, {Component} from 'react';
import './postdetails.css';
import axios from 'axios';
import noimage from './no_image.jpg';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        };
    }

    componentDidMount() {
        axios.get(`/post/${this.props.match.params.postid}`).then(res => this.setState({...res.data}));
    }

    render() {
        return (
            <div className='post-content-box'>
                <div className='post-header'>
                    <h2 className='post-title'>{this.state.title}</h2>
                    <div className='post-author-info'>
                        <p>by {this.state.username}</p>
                        <img src={this.state.profile_pic} alt={this.state.username}/>
                    </div>
                </div>
                <div className='post-content'>
                    <div className='post-image' alt='post image' style={{backgroundImage: `url(${this.state.img || noimage})`}}></div>
                    <p className='post-content-text'>{this.state.content}</p>
                </div>



            </div>
        )
    }
}