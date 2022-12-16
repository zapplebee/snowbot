# snowbot

A bot to tell you in Discord about snow emergencies in Minneapolis and St. Paul Minnesota.

## Needs

Node, a Chromium Browser compatible with Puppeteer, PM2.

```
yarn install

node init.mjs

cp ./ecosystem-sample.config.js ./ecosystem.config.js

# modify the envars in that file,

pm2 start ecosystem.config.js

```
