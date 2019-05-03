import React, {Component} from 'react';
import './post.css';

export default class Post extends Component {

    render() {
        let {post} = this.props;
        return (
            <a href={`/#/post/${post.id}`}>
            <div className='post'>
                <h3>{post.title}</h3>
                <div className='author-info'>
                    <p>by {post.username}</p>
                    <img className='author-image' src={post.profile_pic} alt={post.username}/>
                </div>
            </div>
            </a>
        )
    }
};

