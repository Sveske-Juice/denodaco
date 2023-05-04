-- PRIMARY TABLES
-- Account table

CREATE TABLE IF NOT EXISTS users (
    id INT auto_increment NOT NULL,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    middle_names VARCHAR(255),
    last_name VARCHAR(255),
    country_code VARCHAR(2),
    birthdate DATE,
    account_creation DATE NOT NULL,
    last_login DATE NOT NULL,
    biography TEXT,
    email VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    has_profile_picture BOOLEAN NOT NULL,
    hash VARCHAR(64) NOT NULL, 
    salt VARCHAR(32) NOT NULL;
    PRIMARY KEY (id)
);

-- Post table

CREATE TABLE IF NOT EXISTS posts (
    id INT auto_increment NOT NULL,
    title VARCHAR(255) NOT NULL,
    creation DATE NOT NULL,
    owner_id INT NOT NULL,
    content TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Comment table

CREATE TABLE IF NOT EXISTS comments (
    id INT auto_increment NOT NULL,
    creation DATE NOT NULL,
    post_id INT NOT NULL,
    owner_id INT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (owner_id) REFERENCES users(id)
);


-- RELATIONSHIP TABLES

-- users (1) to posts (M)

CREATE TABLE IF NOT EXISTS users_posts (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (user_id, post_id)
);

-- posts (1) to comments (M)

CREATE TABLE IF NOT EXISTS posts_comments (
    post_id INT NOT NULL,
    comment_id INT NOT NULL,
    PRIMARY KEY (post_id, comment_id)
);