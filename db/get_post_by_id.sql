SELECT posts.title, posts.img, posts.content, users.username, users.profile_pic FROM posts
JOIN users ON users.id = posts.author_id
WHERE posts.id = $1; 