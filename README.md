# XMTP Bot Starter

Hey you wanna make a bot on the XMTP network? Heck yeah. This repo makes that easier.

> ⚠️ Ensure you're using `Yarn 4` for dependency management. Check with `yarn --version`.

## Usage

First, install the package in your project:

```bash
yarn add @xmtp/xmtp-js ethers@5.7.0 @xmtp/grpc-api-client
```

Here's a basic example of how to create the client:

```typescript
// Call `run` with a handler function. The handler function is called
// with a HandlerContext
run(async (context) => {
  // When someone sends your bot a message, you can get the DecodedMessage
  // from the HandlerContext's `message` field
  const messageBody = context.message.content;

  // To reply, just call `reply` on the HandlerContext.
  await context.reply(`ECHO: ${messageBody}`);
});
```

## Getting started

Env variables:

```bash
KEY="YOUR PRIVATE KEY"
XMTP_ENV=dev
```

To install dependencies:

```bash
yarn
```

To run:

```bash
yarn build
yarn start
```

To run with hot-reload:

```bash
yarn build:watch
yarn start:watch
```
