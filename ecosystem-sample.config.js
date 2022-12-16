module.exports = {
  apps: [
    {
      name: "snowbot",
      script: "./index.mjs",
      autorestart: false,
      cron_restart: "* * * * *",
      env: {
        SNOWBOT_MODE: "live",
        SNOWBOT_DISCORD_WEBHOOKS: "https://discord.com/api/webhooks/foo",
      },
    },
  ],
};
