# Description
A school project on survaliance capitalism. This is a static website which connects to a backend with the use of an API. It's a social media where there is a global feed where all posts end up.

# Usage
The website consists of a Node js backend and a statically served front end (both behind a reverse proxy)

## Backend
To run the backend, you must have mariadb installed and running and have the appropiate tables setup (see [tables.sql](https://github.com/Sveske-Juice/denodaco/blob/main/server/sql/tables.sql)).
Once the mariadb server is running you need to clone the repo:

```
git clone https://github.com/Sveske-Juice/denodaco.git
cd denodaco/server/src
```
Then make a file called `.env` here all secret configurations will be stored. Make sure all values with placeholders (<>) are set to something you choose:

```
JWT_SECRET=<some long secret>
DB_USER=<the db user to use (should probably be something like 'denodacoUser' or 'denodacoSlave' etc.)>
DB_PASS=<the pass for the db user>
DB_NAME=denodaco
DB_SOCK=<the socket the mariadb server runs on>
JWT_EXPIRATION=1024 # how long before access tokens expire
MAX_UPLOAD_SIZE=4096 # in MB
```

Install node dependencies:

```
cd ..
npm i
```

Now it's done!

**To test the backend run the following from the root of the repo:** `node server/server.js`

## Serving the frontend
I will be serving the site using nginx but can easily be translated to other reverse proxies like apache.

This is how to run the site under a path (`example.com/denodaco`):

```
set $ip 127.0.0.1;

location /denodaco {
	client_max_body_size 4M; # 4GiB max upload

	index index.html;
	alias /var/www/denodaco/public/;
	access_log on;
	try_files $uri $uri/ @backend;
}

location @backend {
	client_max_body_size 4M; # 4GiB max upload

	proxy_pass http://$ip:3500;

	# Pass client real ip to upstream
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;	
	
	# intercept errors on backend so that we can fallback to 404 (doesn't work, hence setting 502 to 404)
	proxy_intercept_errors on;
	#error_page 502 = 404;
}
```
The above configuration assumes that a server block is already configured. 

## Systemd service
To make it run on boot a simple systemd service can be used:

```
[Unit]
Description=NodeJS backend API for a denodaco instance

[Service]
WorkingDirectory=/var/www/denodaco/server
ExecStart=/usr/bin/node /var/www/denodaco/server/src/server.js

[Install]
WantedBy=multi-user.target
```


# Improvements that could be done
* [Frontend] Switch to Typescript
* [Frontend] Make a backend connection status (offline, online etc.)
* [Frontend] Redirect to login when token expires
* [Frontend] Redirect back to the page user was previosly on when having to auth
* [Backend] Switch to Typescript with Node
* [Backend] Limit login attempts
* [Backend] DB pooling
* [Backend] Refactor error handling
