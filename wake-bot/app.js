require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");

const history = require("connect-history-api-fallback");

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (error) => {
  console.log(error);
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Выберите интересующий для вас раздел`, {
    // кнопаки
    reply_markup: {
      inline_keyboard: [
        [{ text: "Service", web_app: { url: process.env.BASE_URL + "/servic" } }],
        [{ text: "Profile", web_app: { url: process.env.BASE_URL + "/profile" } }],
        [{ text: "Queue", web_app: { url: process.env.BASE_URL + "/queue" } }],
        [
          {
            text: "Пригласить друга",
            switch_inline_query: `Ваша реферальная ссылка https://t.me/Pizza_Sender_Bot?start=${chatId}`,
          },
        ],
      ],
    },
  });
});

const PORT = 3001;

app.use(history());

app.use(express.static(path.join("../.output")));

app.listen(PORT, () => console.log(`server started on ${PORT}`));
