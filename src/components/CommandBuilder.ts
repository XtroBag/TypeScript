import { CommandOptions, SlashCommandOptions } from "./CommandBuilderOptions";

/**
 * Model for Slash Command Handler
 */
export class SlashBuilder {
  constructor(option: SlashCommandOptions) {
    this.data = option.data;
    this.run = option.run;
  }

  data;
  run;
}

/**
 * Model for Command Prefix Handler
 */
export class CommandBuilder {
  constructor(options: CommandOptions) {
    this.data = options.data;
    this.run = options.run;
  }
  data;
  run;
}
