import axios from 'axios';

const initialState = {
    user: {},
    posts: []
}

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_POSTS = 'UPDATE_POSTS';

export function registerUser(user) {
    let data = axios.post('/register', user).then(res => res.data);
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export function loginUser(user) {
    let data = axios.post('/login', user).then(res => res.data);
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export function getUser() {
    let data = axios.get('/user').then(res => res.data);
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export function logout() {
    let data = axios.post('/logout').then(res => res.data);
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export function getPosts(userInfo) {
    let data = axios.post(`/posts`, userInfo).then(res => res.data);
    return {
        type: UPDATE_POSTS,
        payload: data
    };
};

export function createPost(post) {
    let data = axios.post(`/create`, post).then(res => res.data);
    return {
        type: UPDATE_POSTS,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER + '_FULFILLED':
            return {...state, user: action.payload};
        case UPDATE_POSTS + '_FULFILLED':
            return {...state, posts: action.payload};
        default:
            return state;
    };
};