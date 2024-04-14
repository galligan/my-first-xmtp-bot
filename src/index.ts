import "dotenv/config";
import HandlerContext from "./lib/handler-context";
import run from "./lib/runner.js";

run(async (context: HandlerContext) => {
  const messageBody = context.message.content;
  await context.reply(`ECHO: ${messageBody}`);
});
