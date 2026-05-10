import * as chatDao from "../dao/chat.dao.js";
import { getAIResponse, getTitle } from "../services/ai.services.js";

export async function handleMessage(req, res) {
  const { content, chatId } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const generateTitle = async () => {
    if (!chatId) {
      const data = await getTitle({ message: content });

      const chat = await chatDao.createChat({
        title: data.chatTitle,
        user: req.user._id
      });

      res.write(`data: ${JSON.stringify({
        type: "title",
        title: data.chatTitle,
        chatId: chat._id
      })}\n\n`);

      return chat;
    }
    return null;
  };

  const aiStream = async () => {
    const stream = await getAIResponse({ content });

    let AIMessage = "";

    for await (const chunk of stream) {
      const text = chunk?.[0]?.contentBlocks?.[0]?.text || "";

      if (text) {
        AIMessage += text;

        res.write(`data: ${JSON.stringify({
          type: "text",
          text
        })}\n\n`);
      }
    }

    return AIMessage;
  };

  const [chat, AIMessage] = await Promise.all([
    generateTitle(),
    aiStream()
  ]);

  res.end();
}