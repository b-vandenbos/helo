INSERT INTO posts (
    title,
    content,
    img,
    author_id
) VALUES (
    $2,
    $3,
    $4,
    $1
);

SELECT posts.id, posts.title, posts.img, posts.content, users.username, users.profile_pic FROM posts
JOIN users on users.id = posts.author_id;