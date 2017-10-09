/**
 * Created by ddrager on 10/6/17.
 */
const TeleBot = require('telebot');
console.log("Setting up Telegram bot with key: "+process.env.TELEGRAM_API_KEY);
const bot = new TeleBot(process.env.TELEGRAM_API_KEY);

/*var algoliasearch = require('algoliasearch');

var client = algoliasearch(process.env.ALGOLIA_API_APP, process.env.ALGOLIA_API_KEY);
var index = client.initIndex(process.env.LGOLIA_API_INDEX);
*/

bot.on('text', (msg) => msg.reply.text(msg.text));

bot.start();

