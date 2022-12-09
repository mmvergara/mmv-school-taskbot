# School TaskBot

Simple Discord bot (webhook) for school task/schedule

- deployment date: December 9, 2022
- hosted on: [Render](https://render.com/)

## Installation

- npm install
- fill out Environment Variables

```
APPLICATION_ID=
GUILD_ID=
PUBLIC_KEY=
MONGODB_URI=
PORT=


<!-- optional -->
STUDENTROLE_ID=
DEPLOYMENT_URL=
<!-- optional -->
```

> Note: STUDENTROLE_ID This is when you to limit the bot commands to users with a specific role only.
> Note: DEPLOYMENT_URL This is when you want to use uptime websites, this will send a post request in the interaction route.

- npm build
- npm start
- npm start:dev
