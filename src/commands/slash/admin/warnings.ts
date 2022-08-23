import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";
import DB from "../../../models/WarningDB";

module.exports = new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("check a users warnings")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("adds a warning")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("provide a reason")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("evidence")
            .setDescription("provide evidence")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("check")
        .setDescription("check the warnings")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("remove a specific warning")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option.setName("warnid").setDescription("provide the warning ID")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("clear")
        .setDescription("clear all warnings")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true)
        )
    ),
  async run(client, int) {
    const Sub = int.options.getSubcommand();
    const Target = int.options.getUser("target");
    const Reason = int.options.getString("reason");
    const Evidence = int.options.getString("evidence" || "None provided");
    const WarnID = int.options.getNumber("warnid"); // fix this to be not in string if i can
    const WarnDate = new Date(int.createdTimestamp).toLocaleDateString();

    if (Sub === "add") {
      DB.findOne(
        { GuildID: int.guildId, UserID: Target?.id, UserTag: Target?.tag },
        async (err: any, data: any) => {
          if (err) throw err;
          if (!data) {
            data = new DB({
              GuildID: int.guild?.id,
              UserID: Target?.id,
              UserTag: Target?.tag,
              Content: [
                {
                  ExecuterID: int.user.id,
                  ExecuterTag: int.user.tag,
                  Reason: Reason,
                  Evidence: Evidence,
                  Date: WarnDate,
                },
              ],
            });
          } else {
            const obj = {
              ExecuterID: int.user.id,
              ExecuterTag: int.user.tag,
              Reason: Reason,
              Evidence: Evidence,
              Date: WarnDate,
            };
            data.Content.push(obj);
          }
          data.save();
        }
      );

      int.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Warning Added")
            .setColor("Blurple")
            .setDescription(
              `Warned: ${Target?.tag} | ||${Target?.id}||\n**Reason**: ${Reason}\n**Evidence**: ${Evidence || "None Provided"}`
            )
            .setTimestamp(),
        ],
      });
    } else if (Sub === "check") {
      DB.findOne(
        { GuildID: int.guildId, UserID: Target?.id, UserTag: Target?.tag },
        async (err: any, data: any) => {
          if (err) throw err;
          if (data) {
            int.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Warning check")
                  .setColor("Blurple")
                  .setDescription(
                    `${data.Content.map(
                      (w: any, i: number) => `
                        **ID**: ${i + 1}
                        **By**: ${w.ExecuterTag}
                        **Date**: ${w.Date}
                        **Reason**: ${w.Reason}
                        **Evidence**: ${w.Evidence || "None provided"}
                    `
                    ).join(" ")}`
                  )
                  .setTimestamp(),
              ],
            });
          } else {
            int.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("No warnings")
                  .setColor("Blurple")
                  .setDescription(
                    `User: ${Target?.tag} has no warnings.`
                  )
                  .setTimestamp(),
              ],
            });
          }
        }
      );
    } else if (Sub === "remove") {
      DB.findOne(
        { GuildID: int.guildId, UserID: Target?.id, UserTag: Target?.tag },
        async (err: any, data: any) => {
          if (err) throw err;
          if (data) {
            data.Content.splice(WarnID, 1);
            int.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Warning removed")
                  .setColor("Blurple")
                  .setDescription(
                    `${Target?.tag}'s warning id: ${WarnID} has been removed`
                  )
                  .setTimestamp(),
              ],
            });
            data.save();
          } else {
            int.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("No warnings")
                  .setColor("Blurple")
                  .setDescription(
                    `User: ${Target?.tag} has no warnings.`
                  )
                  .setTimestamp(),
              ],
            });
          }
        }
      );
    
      // this code here works but it returns error when it tried and deletes the document
      // needs fixing!
    } else if (Sub === "clear") {
      DB.findOne(
        { GuildID: int.guildId, UserID: Target?.id, UserTag: Target?.tag },
        async (err: any, data: any) => {
          if (err) throw err;
          if (data) {
            await DB.findOneAndDelete({ GuildID: int.guildId, UserID: Target?.id, UserTag: Target?.tag })
            int.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Warnings cleared")
                  .setColor("Blurple")
                  .setDescription(`${Target?.tag}'s warning were cleared`)
                  .setTimestamp(),
                
              ],
            });
            data.save()
          } else {
            int.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("No warnings")
                  .setColor("Blurple")
                  .setDescription(
                    `User: ${Target?.tag} has no warnings.`
                  )
                  .setTimestamp(),
              ],
            });
          }
        }
      );
    }
  },
});
