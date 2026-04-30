import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, toolStrategy } from "langchain";
import z from "zod/v3";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
});

const agent = createAgent({
  model,
  tools: [],
});

export async function getAIResponse({ content }) {
  const stream = await agent.stream(
    {
      messages: [{ role: "user", content }],
    },
    { streamMode: "messages" },
  );
  return stream;
}

export async function getTitle({ messages }) {
  const titleAgent = createAgent({
    model,
    tools: [],
    responseFormat: toolStrategy(
      z.object({
        chatTitle: z.string().describe("The title of the chat"),
      }),
    ),
  });

  const response = await titleAgent.invoke({
    messages,
    content: `Generate a concise title for the following message: ${messages}`,
  });

  return response.structuredResponse;
}
