import mongoose, { Schema, type Document } from "mongoose";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  text: string;
  chat: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  },
  { timestamps: true },
);

MessageSchema.index({ chat: 1, createdAt: 1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);