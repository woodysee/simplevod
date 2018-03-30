# Simple VOD

This documentation is for macOS / Linux-based platforms.

The app is split into a frontend (`/client`) and backend (`/server`).

## Requirements for local development

## Setting up

### Client

- Find every Sass file in src subdirectories, and create a corresponding CSS file next to it. Run: `npm run watch-css`

- In `/client/package.json`, set `proxy` to `server` to allow client and server to request and respond to each other: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually
