# Simple VOD

This documentation is for macOS / Linux-based platforms.

The app is split into a frontend (`/client`) and backend (`/server`).

## Requirements for local development

## Setting up

## Initialisation ##

1. Install backend packages at `/server`.
```
npm install
```
2. Install frontend packages at `/client`.
```
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

### Running

1. Run the following in your Terminal.

```shell

npm install -g nodemon # To install nodemon globally
cd server
nodemon
cd ../client
npm start

```

2. If you installed `npm-run-all` at the repository root level, simply run: `npm start`.

3. Every time the web app is launched, `watch-css` will be run and compoile every SCSSs in src subdirectories, and will create a corresponding CSS file next to it, i.e. `npm run watch-css`.

### Development

- `/client`: React-Redux Frontend web application generated from https://github.com/facebook/create-react-app
  - All CSS files are automatically compiled from SCSS files. Make style changes in the SCSS files.
  - In `/client/package.json`, if you want to develop remotely, set `proxy` to `server` to allow client and server to request and respond to each other. Source: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually

### Deployment

- Build the frontend site.
- Packages required: `nginx`, `pm2`

```shell

cd client
npm run build
cd ../server
npm start # This will run the nodejs server app

```
