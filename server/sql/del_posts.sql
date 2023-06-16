USE denodaco;

-- delete all posts and comments
SET FOREIGN_KEY_CHECKS=0;
DELETE FROM posts;
DELETE FROM comments;