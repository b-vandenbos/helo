const bcrypt = require('bcryptjs');

module.exports =  {
    register: async (req, res) => {
        let {username, password, profile_pic} = req.body;
        let db = req.app.get('db');
        let userArr = await db.get_user_by_username(username);
        let user = userArr[0];
        if (user) {
            return res.status(200).send(`Username ${username} is unavailable.`);
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let newUser = await db.create_user(username, hash, profile_pic);
        req.session.user = newUser[0];
        req.session.user.isLoggedIn = true;
        res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        let {username, password} = req.body;
        let db = req.app.get('db');
        const userArr = await db.get_user_by_username(username);
        let user = userArr[0];
        if (!user) {
            return res.status(200).send(`Account not found`);
        };
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send(`Incorrect Password`);
        };
        req.session.user = user;
        req.session.user.isLoggedIn = true;
        res.status(200).send(req.session.user);
    },

    getUser: async (req, res) => {
        if (req.session.user) {
            return res.status(200).send(req.session.user);
        } else {
            return res.status(200).send('Please log in');
        }
    },

    logout: async (req, res) => {
        req.session.destroy();
        let user = {};
        res.status(200).send(user);
    },

    getPosts: async (req, res) => {
        let {userposts, search} = req.body;
        let {id} = req.session.user;
        let db = req.app.get('db');
        if (userposts && search !== '') {
            let posts = await db.get_search(search);
            res.status(200).send(posts);
        }
        else if (!userposts && search === '') {
            let posts = await db.get_all_no_user(id);
            res.status(200).send(posts);
        }
        else if (!userposts &&  search !== '') {
            let posts = await db.get_search_no_user(id, search);
            res.status(200).send(posts);
        }
        else if (userposts && search === '') {
            let posts = await db.get_all_posts();
            res.status(200).send(posts);
        }
    },

    getActivePost: async (req, res) => {
        let {id} = req.params;
        let db = req.app.get('db');
        let postArr = await db.get_post_by_id(id);
        let post = postArr[0];
        res.status(200).send(post);
    },

    createPost: async (req, res) => {
        let {id} = req.session.user;
        let {title, content, image} = req.body;
        let db = req.app.get('db');
        let posts = await db.create_post([id, title, content, image]);
        res.status(200).send(posts);
    }
}