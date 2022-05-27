import { Client, Intents } from "discord.js"
import dotenv from "dotenv"
import * as data from "./config.json" assert {type: "json"};
import { keepAlive } from "./server.js"

dotenv.config({ path: '../.env' })

const config = data.default.config

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

keepAlive()
client.login(process.env.DISCORD_BOT_TOKEN)

client.once("ready", () => {
  console.log("ready!")
})

client.once("reconnecting", () => {
  console.log("reconnecting"
  )
})

client.once("disconnect", () => {
  console.log("disconnect")
})

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.triggerMessage)) return;

  const threadMessages = () => {
    config.botMessages.map(musicLine =>
      setTimeout(() => message.channel.send(musicLine), 10000)
    )
  }

  const threadMessagesEveryHour = setInterval(threadMessages, 3600000);

  setTimeout(() => {
    clearInterval(threadMessagesEveryHour);
    message.channel.send(config.endThreadMessages)
  }, 36000000)
}
)