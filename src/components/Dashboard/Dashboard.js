import React, {Component} from 'react';
import './dashboard.css';
import search from './search_logo.png';
import {connect} from 'react-redux';
import {getPosts} from './../../ducks/reducer';
import Post from './subcomponents/Post';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            searchInput: '',
            userposts: true
        };

        this.getPosts = this.getPosts.bind(this);
        this.reset = this.reset.bind(this);
    };

    componentDidMount() {
        let {id} = this.props.reducer.user;
        let {userposts} = this.state;
        let search = '';
        this.props.getPosts({id, search, userposts});
    }

    getPosts() {
        let search = this.state.searchInput;
        let {userposts} = this.state;
        let {id} = this.props.reducer.user;
        let userInfo = {id, search, userposts};
        this.props.getPosts(userInfo);
    }

    reset() {
        this.setState({searchInput: ''});
        let search = '';
        let {userposts} = this.state;
        let {id} = this.props.reducer.user;
        let userInfo = {id, search, userposts};
        this.props.getPosts(userInfo);
    }

    render() {
        let posts = this.props.reducer.posts.map(post => {
            return <Post key={post.id} post={post}/>
        })
        return (
            <div className='dashboard'>
                <div className='dashboard-filter'>
                    <div className='searchbox'>
                        <input className='searchbar' value={this.state.searchInput} placeholder='Search by Title' onChange={e => this.setState({searchInput: e.target.value})}/>
                        <img className='search-button' src={search} alt='search'onClick={() => this.getPosts()}/>
                        <button className='reset-button' onClick={() => this.reset()}>Reset</button>
                    </div>
                    <div className='checkbox'>
                        <p>My Posts</p>
                        <input id='checkbox' type='checkbox' value='on' defaultChecked={true} onChange={() => this.setState({userposts: !this.state.userposts})}/>
                    </div>
                </div>
                <div className='posts-container'>
                    {posts}
                </div>
            
            
            
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
};

export default connect(mapState, {getPosts})(Dashboard);