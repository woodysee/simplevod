# Simple VOD

This documentation is only applicable for developing or deploying on macOS / Ubuntu 16.04.

## Requirements for local development

## Setting up

## Initialisation ##

1. Install backend packages at `/server`.

```shell
npm install
```
2. Install frontend packages at `/client`.

```shell
npm install
```
3. Optional: Install `npm-run-all` at the repository root level, which allows for concurrently launching both front- and backend at the same time for convenience.

4. Duplicate `/server/.env.example` into `/server/.env` and fill in the environment variables.

```shell
SERVER_PORT=
MONGO_URI=mongodb://<username>:<password>@<domain>:<mongo_store_port>/simplevod
CLIENT_DOMAIN=
```

## Local development ##

### Running the apps in development

1. Run the following in your Terminal.

```shell
npm install -g nodemon # To install nodemon globally
cd server
nodemon
# Open another Terminal window...
cd ../client
npm start
```

2. If you installed `npm-run-all` at the repository root level, simply run: `npm start` in order to quickly start both front- and backend web applications.

3. Every time the web app is launched, `watch-css` will be run and compoile every SCSSs in src subdirectories, and will create a corresponding CSS file next to it, i.e. `npm run watch-css`.

### Structure

- `/client`: React JS Frontend web application generated from https://github.com/facebook/create-react-app
	- All CSS files are automatically compiled from SCSS files. Make style changes in the SCSS files.
	- In `/client/package.json`, if you want to develop remotely, set `proxy` to `server` to allow client and server to request and respond to each other. Refer to `create-react-app` documentation for [more details](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually).
	- Builds are are compiled into `/client/build`
- `/server`: Node.js Backend web application connecting and processing to and from the client frontend to and from the MongoDB data store.
- MLab: MongoDB NoSQL data store hosted remotely, storing tables `viewingHistory` and `videos`

### Deployment

- Ensure that you have started an Amazon EC2 Instance running Ubuntu 16.04 to host your web app
- Packages required:
	- `nodejs`,
	- `npm` to manage packages of the web app source code,
	- `git` to manage the source code from a remote repository,
	- `nginx` as web server, and
	- `pm2` to start and daemonise the server app

- Install `git` globally.

```shell

apt-get install git
git config --global user.name "Your Name"
git config --global user.email "youremail@domain.com"
```

- Install `nodejs`, `npm`, then `pm2`.

```shell
apt-get install nodejs
nodejs -v
# v8.11.1

apt-get install npm
sudo npm install -g pm2

```

- Set up `nginx` as a reverse proxy server to allow the public to access the site.

```shell
sudo apt-get update
sudo apt-get install nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw status # to verify

systemctl status nginx # to check if nginx is running

sudo vi /etc/nginx/sites-available/default

```

- Remove all content from the existing `location / { ... }` block with your own configuration.

```ini

...

server {
	listen 80;

	server_name { public_hostname_of_the_instance };

	location / {
		proxy_pass http://{ private_ip_of_the_instance }:{ server_port };
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
		# proxy_redirect off;
	}
}

```

- Run the web app.

```shell
cd client
npm run build
cd ../server
pm2 start app.js # To start app
pm2 list # to check running apps
```

## References ##
- [Understanding the Nginx Configuration File Structure and Configuration Contexts](https://www.digitalocean.com/community/tutorials/understanding-the-nginx-configuration-file-structure-and-configuration-contexts)
- [How To Install Node.js on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
- [Install npm on Ubuntu 16.04](https://www.rosehosting.com/blog/install-npm-on-ubuntu-16-04/)
- [How To Set Up a Node.js Application for Production on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
