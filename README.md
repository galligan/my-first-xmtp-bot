# XMTP Bot Starter

Hey you wanna make a bot on the XMTP network? Heck yeah. This repo makes that easier.

## Usage

First, install the package in your project:

```bash
yarn add @xmtp/xmtp-js ethers@5.7.0 @xmtp/grpc-api-client
```

Here's a basic example of how to create the client:

````tsx
export default async function createClient(): Promise<Client> {
  // Retrieve the private key from environment variables
  const key = process.env.KEY;

  // Ensure the key is provided, otherwise throw an error
  if (!key) {
    throw new Error("KEY not set");
  }

  // Create a new wallet instance using the provided key
  const wallet = new Wallet(key);

  // Check if the XMTP environment is correctly set to either 'production' or 'dev'
  if (process.env.XMTP_ENV !== "production" && process.env.XMTP_ENV !== "dev") {
    throw new Error("XMTP_ENV must be set to 'production' or 'dev'");
  }

  // Create a new XMTP client with the specified environment and API client factory
  const client = await Client.create(wallet, {
    env: process.env.XMTP_ENV as any, // Cast the environment variable to any type as a temporary workaround
    // @ts-ignore
    apiClientFactory: GrpcApiClient.fromOptions, // Use the gRPC API client factory for the XMTP client
  });

  // Return the initialized XMTP client
  return client;
}

And how to answer automatically to a request

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
````

## Getting started

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

### Environment

```bash
cp .env.example .env
```

Powered by <a href="https://kapa.ai">Kapa</a>
