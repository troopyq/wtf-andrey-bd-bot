import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';

config();

(() => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const idDima = process.env.TELEGRAM_DIMA;
  const idVlad = process.env.TELEGRAM_VLAD;
  console.log('RUN TG BOT', process.env.TELEGRAM_BOT_TOKEN)

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

  const isDev = import.meta.env?.DEV;
  const devUrl = 'https://12a9-178-46-64-240.ngrok-free.app';
  const prodUrl = 'https://troopyq.github.io/wtf-andrey-bd-bot';


  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.chat.first_name || 'Странник';

    console.log({ chatId }, msg.chat)

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
    console.log('get web_app_data: ', msg.web_app_data);
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, msg.web_app_data?.data || 'Жди приз');


    if (idDima) await bot.sendMessage(idDima, 'Андрей на всё ответил правильно. Высылай ему деньги)');
    // if (idVlad) await bot.sendMessage(idVlad, 'Андрей на всё ответил правильно. Высылай ему деньги)');
  })
})()