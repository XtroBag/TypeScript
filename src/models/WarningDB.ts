import mongoose, { Schema, model } from 'mongoose';

const WarningDB: Schema = new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
});

export default mongoose.model("Warnings", WarningDB)