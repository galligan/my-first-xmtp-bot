# Your First Bot

Hey you wanna make a bot on the XMTP network? Heck yeah. This repo makes that easier. To see other Bot examples checkout [Awesome XMTP](https://github.com/xmtp/awesome-xmtp)

> ⚠️ Ensure you're using `Yarn 4` for dependency management. Check with `yarn --version`.

## Usage

#### Setup and Dependencies

First, install the package in your project:

```bash
yarn add @xmtp/xmtp-js ethers@5.7.0 @xmtp/grpc-api-client dotenv redis node-cron
```

To create a streamlined and highly effective template for a conversational bot that developers can easily adapt and extend, we'll focus on simplicity and clarity. Below is a concise template that includes essential features such as memory caching, Redis integration for persistent data, handling stop words, displaying numbered options, and a brief guide on deploying to Railway.

First, ensure you have Node.js installed. Then, set up your project with the necessary dependencies:

Create a `.env` file for environment variables like Redis credentials and any other configuration.

#### Bot Logic with Memory Cache and Redis Integration

```tsx
const inMemoryCacheStep = new Map<string, number>();
const stopWords = ["stop", "unsubscribe", "cancel", "list"];

run(async (context: HandlerContext) => {
  const redisClient = await getRedisClient();
  const { content, senderAddress } = context.message;
  const lowerContent = content.toLowerCase();

  if (stopWords.some((word) => lowerContent.includes(word))) {
    inMemoryCacheStep.set(senderAddress, 0);
    await redisClient.del(senderAddress);
    await context.reply(
      "You are now unsubscribed. You will no longer receive updates."
    );
    return;
  }

  const cacheStep = inMemoryCacheStep.get(senderAddress) || 0;
  let message = "";
  switch (cacheStep) {
    case 0:
      message = "Welcome! Choose an option:\n1. Info\n2. Subscribe";
      inMemoryCacheStep.set(senderAddress, 1);
      break;
    case 1:
      if (content === "1") {
        message = "Here is the info.";
      } else if (content === "2") {
        await redisClient.set(senderAddress, "subscribed");
        message = "You are now subscribed. You will receive updates.";
      } else {
        message = "Invalid option. Please choose 1 for Info or 2 to Subscribe.";
      }
      inMemoryCacheStep.set(senderAddress, 0);
      break;
    default:
      message = "Invalid option. Please start again.";
      inMemoryCacheStep.set(senderAddress, 0);
      break;
  }
  await context.reply(message);
});
```

#### Cron for daily subscriptions

Create a cron that sends daily messages to your redis subscribers. This bot can run daily or according to your logic

```jsx
cron.schedule(
  "0 0 * * *", //Daily
  async () => {
    const redisClient = await getRedisClient();
    const keys = await redisClient.keys("*");
    console.log(`Running daily task. ${keys.length} subscribers.`);
    for (const address of keys) {
      const subscriptionStatus = await redisClient.get(address);
      if (subscriptionStatus === "subscribed") {
        console.log(`Sending daily update to ${address}`);
        const client = await createClient();
        const conversation = await client?.conversations.newConversation(
          address
        );
        await conversation.send("Here is your daily update!");
      }
    }
  },
  {
    scheduled: true,
    timezone: "UTC",
  }
);
```

#### Deployment to Railway

Railway is a platform that simplifies application deployment. Here’s how to deploy this bot:

- Sign up at [Railway](https://railway.app/).
- Click 'New Project' and select 'Node.js'.
- Connect your GitHub repository or use Railway's template.
- Set your environment variables (`REDIS_URL`, etc.) in Railway's dashboard.
- Deploy your application.

#### Development

Env variables:

```bash
cp .env.example to .env
```

```bash
KEY= # the private key of the bot
XMTP_ENV= # set to production
PUBLIC_BOT_ADDRESS= # the public address of the bot
REDIS_CONNECTION_STRING= # the connection string for the Redis database
DEBUG= # set to true to test reliability
```

To install dependencies:

> ⚠️ Ensure you're using `Yarn 4` for dependency management. Check with `yarn --version`.

```bash
yarn install
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

## Identities 🥷🏻

![](https://github.com/xmtp/awesome-xmtp/assets/1447073/9bb4f8c2-321e-4b6d-b52e-2105d69c4d47)

Learn about the almost 2 million identities that are already part of XMTP by visiting the [Dune dashboard](https://dune.com/xmtp_team/dash).

## Documentation 📚

To learn more about XMTP, to go the [docs](https://docs.xmtp.org/).
