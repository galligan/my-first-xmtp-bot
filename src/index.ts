import "dotenv/config";
import HandlerContext from "./handler-context";
import run from "./runner.js";

run(async (context: HandlerContext) => {
  const messageBody = context.message.content;
  await context.reply(`ECHO: ${messageBody}`);
});
