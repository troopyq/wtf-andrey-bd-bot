/* eslint-disable no-undef */
import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';

config();

(() => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const idDima = process.env.TELEGRAM_DIMA;
  const idVlad = process.env.TELEGRAM_VLAD;
  const userAndrey = process.env.TELEGRAM_ANDREY_NICK;
  const userDima = process.env.TELEGRAM_DIMA_NICK;
  const vaucherId = process.env.VAUCHER_ID;

  console.log('RUN TG BOT', process.env.NODE_ENV)

  if (!(token)) {
    return console.log('NOT FOUND TOKEN')
  }

  const bot = new TelegramBot(token, { polling: true });

  const commands = {
    start: '/start',
  }

  // установка основных команд в список команд
  bot.setMyCommands([
    { command: commands.start, description: 'Начать' },
  ])

  const isDev = import.meta.env?.DEV || process.env.NODE_ENV === 'development';
  const prodUrl = 'https://troopyq.github.io/wtf-andrey-bd-bot';
  const devUrl = 'https://70bd-45-135-180-220.ngrok-free.app';

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.chat.first_name || 'Странник';

    console.log(`SEND START: ${new Date().toUTCString()} : `, msg.chat.username);

    await bot.sendMessage(chatId, "Привет, " + user + ". Начнем игру? =) \n\nНажми \"Открыть\" внизу", {
      parse_mode: 'Markdown',
      reply_markup: {
        remove_keyboard: true,
        resize_keyboard: true,
        keyboard: [[{ text: 'Открыть', web_app: { url: isDev ? devUrl : prodUrl } }]],
      }
    });
  });

  bot.addListener('web_app_data', async (msg) => {
    console.log(`SEND BUTTON SUCCESS: ${new Date().toUTCString()} : `, msg.chat.username);
    const chatId = msg.chat.id;

    if ([userAndrey, userDima].includes(msg.chat.username)) {
      await bot.sendMessage(chatId, `Поздравляем с успешным прохождением теста!\n
  Но, перед тем как ты получишь водительское удостоверение, предлагаем пройти курс молодого шумахера на скоростных машинках)\n
  Добро пожаловать в клуб "Чудеса на виражах!"`);
      if (vaucherId) await bot.sendPhoto(chatId || '', vaucherId)

      const text = `(${msg.chat.username}) на всё ответил правильно`

      if (idDima) await bot.sendMessage(idDima, text);
      if (idVlad) await bot.sendMessage(idVlad, text);
    }
  })
})()