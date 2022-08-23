import { Client, Collection, GatewayIntentBits } from "discord.js";
import mongoose from 'mongoose';
import settings from "../config.json";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
import config from "./config/config";
import handler from "./handler/main";

// Collections
const commands = new Collection();
const slashs = new Collection();

// Handler
handler(client);

// Database
mongoose.connect(settings.MongoURI).catch(err => console.log(err))


// Client Login
client.login(config.token);

export { commands, slashs };
