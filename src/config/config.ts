import * as dotenv from "dotenv";
import setMode from "./setMode";
dotenv.config();

const { CLIENT_ID, GUILD_ID, TOKEN } = setMode("production"); 

export default {
  token: TOKEN,
  clientId: CLIENT_ID,
  guildId: GUILD_ID,
  prefix: "!",
  version: "1.0.0",
};
