import setPresence from "../components/setPresence";
import ClientEvent from "../components/ClientEvent";
import { ActivityType } from "discord.js";
import config from "../config/config";

module.exports = new ClientEvent("ready", async (client) => {
  console.clear();
  console.log(`${client.user?.username} is online!`);

  new setPresence(client, [
    {
      content: `${config.prefix}help - v${config.version}`,
      type: ActivityType.Playing,
      status: "idle",
    },
    {
      content: `${client.guilds.cache.size} ${
        client.guilds.cache.size === 1 ? "server" : "servers"
      }`,
      type: ActivityType.Watching,
      status: "idle",
    },
    {
      content: `${client.users.cache.size} ${
        client.users.cache.size === 1 ? "user" : "users"
      }`,
      type: ActivityType.Listening,
      status: "idle",
    },
  ]);
});
