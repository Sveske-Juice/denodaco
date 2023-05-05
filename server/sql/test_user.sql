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

INSERT INTO users(
            username,
            first_name,
            middle_names,
            last_name,
            country_code,
            birthdate,
            account_creation,
            last_login,
            email,
            is_admin,
            has_profile_picture,
            hash,
            salt),
        VALUES (
            ${newUser["username"]},
            ${newUser["first_name"]},
            ${newUser["middle_names"]},
            ${newUser["last_name"]},
            ${newUser["country_code"]},
            ${newUser["birthdate"]},
            ${newUser["account_creation"]},
            ${newUser["last_login"]},
            ${newUser["email"]},
            ${newUser["is_admin"]},
            ${newUser["has_profile_picture"]},
            ${newUser["hash"]},
            ${newUser["salt"]},
        );`