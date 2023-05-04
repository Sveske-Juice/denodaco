USE denodaco;

INSERT INTO users(username, account_creation, last_login, email, is_admin, has_profile_picture, hash, salt)
VALUES (
    'test',
    '1969-04-20',
    '1969-04-20',
    'test@bob.com',
    '0',
    '0',
    'lol',
    'lol'
);