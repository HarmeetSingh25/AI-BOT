import { getTitle } from "../services/Ai.services.js";
import * as utils from "../utils/utils.js";
export const handleMessages = async (req, res) => {
  const { content, chatId } = req.body;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");

  const Generatedtitle = async () => {
    if (!chatId) {
      const data = await getTitle({ messages: content });
      const chat = await chatdao.createChat({
        title: data.chatTitle,
        userId: req.user._id,
      });
      res.write(`data: ${JSON.stringify({ chatId: chat._id })}\n\n`);
      return chat;
    }

    return null;
  };

  const aiStream = async () => {
    const stream = await getAIResponse({ content });

    let AiMessage = "";

    for await (const chunk of stream) {
      AiMessage += chunk[0].contentBlocks[0].text;
      res.write(
        `data: ${JSON.stringify({ text: chunk[0].contentBlocks[0].text })}\n\n`,
      );
    }
    return AiMessage;

  };
  const [chat, AiMessage] = await Promise.all([
    Generatedtitle(),
    aiStream(),
  ]);

res.end();
};
