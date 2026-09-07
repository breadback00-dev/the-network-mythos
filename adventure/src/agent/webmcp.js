let lifecycle;
export function registerTools(game) {
  const context = document.modelContext;
  if (!context?.registerTool) return false;
  lifecycle?.abort();
  lifecycle = new AbortController();
  const tools = [
    {
      name: "read_investigation",
      description:
        "Read this player’s discovered sources, current actions, conversation and saved revision. No undiscovered evidence.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () => result(game.read()),
    },
    {
      name: "act_in_investigation",
      description:
        "Perform the same validated and saved action as the game UI. Use travel(scene), inspect(id), pin(id), talk(id), reply(choice), closeDialogue, emphasis(ability), spend(ability), assurance(value promised/declined), credential(credential badge/request), connect(sources and claim), insignia(value), or commit(preview). Read current state first. Reuse an exact preview before committing.",
      inputSchema: {
        type: "object",
        properties: { command: { type: "object" } },
        required: ["command"],
        additionalProperties: false,
      },
      execute: async ({ command }) => result(await game.command(command)),
    },
    {
      name: "preview_investigation_packet",
      description:
        "Preview a fictional correction or ending. No real messages are sent. Confirmation needs the exact returned preview through act_in_investigation.",
      inputSchema: {
        type: "object",
        properties: { selection: { type: "object" } },
        required: ["selection"],
        additionalProperties: false,
      },
      execute: async ({ selection }) => result(game.preview(selection)),
    },
    {
      name: "preview_new_investigation",
      description:
        "Show what starting over replaces. Returns a reset token; does not erase anything.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () => result(game.resetPreview()),
    },
    {
      name: "confirm_new_investigation",
      description:
        "Replace this illustrated run only using the exact token from its visible reset preview.",
      inputSchema: {
        type: "object",
        properties: { token: { type: "object" } },
        required: ["token"],
        additionalProperties: false,
      },
      execute: async ({ token }) => result(await game.reset(token)),
    },
    {
      name: "export_investigation",
      description:
        "Return the retained save JSON for this player. Browser file import remains user-mediated.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () => result({ save: game.export() }),
    },
  ];
  for (const tool of tools) {
    const wrapped = {
      ...tool,
      annotations: {
        readOnlyHint: ["read_investigation", "export_investigation"].includes(
          tool.name,
        ),
      },
      execute: async (args) => {
        try {
          if (
            !args ||
            typeof args !== "object" ||
            Array.isArray(args) ||
            Object.keys(args).some(
              (k) => !Object.hasOwn(tool.inputSchema.properties, k),
            ) ||
            (tool.inputSchema.required || []).some(
              (k) => !Object.hasOwn(args, k),
            )
          )
            throw Error("Invalid tool arguments.");
          return await tool.execute(args);
        } catch (e) {
          return { error: e.message };
        }
      },
    };
    try {
      Promise.resolve(
        context.registerTool(wrapped, { signal: lifecycle.signal }),
      ).catch((error) =>
        console.warn("Game tool registration failed:", error.message),
      );
    } catch (error) {
      console.warn("Game tool registration failed:", error.message);
    }
  }
  return true;
}
function result(value) {
  return value;
}
