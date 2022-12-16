export const TABLE_NAME = `snow_bot_records`;
export const TABLE_KEY_NAME = `record_key`;
export const TABLE_VALUE_NAME = `record_value`;
export const MODE = process.env.SNOWBOT_MODE ?? "local";
export const WEBHOOKS = process.env.SNOWBOT_DISCORD_WEBHOOKS?.split(",") ?? [];
