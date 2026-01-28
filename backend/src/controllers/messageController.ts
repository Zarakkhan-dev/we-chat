import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";

export const getMessages = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.userId;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const message = await Message.find({ chat: chatId })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    res.json(message);
  } catch (error) {
    res.status(500);
    next(error);
  }
};
