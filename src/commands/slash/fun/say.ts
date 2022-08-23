import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

module.exports = new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Envia un mensaje a travéz de mi.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("El contenido del mensaje.")
        .setRequired(true)
    ),
  async run(client, int) {
    try {
      const txt = int.options.get("content");

      await int.reply({
        content: "Message sent!",
        ephemeral: true,
      });
      await int.channel?.send({ content: `${txt?.value}` });
    } catch (err) {
      console.log(err);
      
    }
  },
});
