SELECT posts.id, posts.title, posts.img, posts.content, users.username, users.profile_pic FROM posts
JOIN users ON users.id = posts.author_id
    WHERE posts.title ~* $1;