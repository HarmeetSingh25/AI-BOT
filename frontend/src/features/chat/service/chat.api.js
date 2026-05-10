export async function getAiResponse({
  message,
  chatId,
  onContent,
  onChat,
  onComplete
}) {
  const res = await fetch("/api/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      content: message,
      chatId
    })
  });

  // ✅ handle backend failure
  if (!res.ok) {
    const err = await res.text();
    console.error("API ERROR:", err);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop(); // keep incomplete line

    for (const line of lines) {
      if (!line.trim()) continue;

      if (line.startsWith("data:")) {
        const jsonStr = line.replace("data:", "").trim();

        try {
          const parsed = JSON.parse(jsonStr);

          if (parsed.text) {
            onContent(parsed.text);
          }

          // ✅ handle chat creation inside same stream
          if (parsed.title) {
            onChat({
              id: chatId,
              title: parsed.title,
              messages: []
            });
          }

        } catch (err) {
          console.error("Parse error:", jsonStr);
        }
      }
    }
  }

  onComplete();
}