// Flat list of AI tools in the workflow, no task mapping. Kept open-ended on
// purpose since a tool's role tends to expand (e.g. Claude picks up more jobs
// over time), which would make a per-task list stale fast. One entry per
// distinct logo — products from the same maker (Claude / Claude Code, Figma /
// FigJam) are collapsed so the same icon never repeats.
window.__AI_TOOLS__ = [
  { name: "Claude", logo: "assets/img/built-with-ai/stack/claude.svg" },
  { name: "Cursor", logo: "assets/img/built-with-ai/stack/cursor.svg" },
  { name: "ChatGPT", logo: "assets/img/built-with-ai/stack/chatgpt.svg" },
  { name: "Gemini", logo: "assets/img/built-with-ai/stack/gemini.svg" },
  { name: "Figma", logo: "assets/img/built-with-ai/stack/figma.svg" },
  { name: "Mermaid.ai", logo: "assets/img/built-with-ai/stack/mermaid.svg" },
  { name: "Wispr Flow", logo: "assets/img/built-with-ai/stack/wispr-flow.svg" },
  { name: "Notion AI", logo: "assets/img/built-with-ai/stack/notion.svg" },
  // Notetakers kept last.
  { name: "Fireflies.ai", logo: "assets/img/built-with-ai/stack/fireflies.svg" },
  { name: "Fathom", logo: "assets/img/built-with-ai/stack/fathom.svg" }
];
