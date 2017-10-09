/**
 * Created by ddrager on 10/6/17.
 */
const TeleBot = require('telebot');
console.log("Setting up Telegram bot with key: "+process.env.TELEGRAM_API_KEY);
const bot = new TeleBot(process.env.TELEGRAM_API_KEY);

var algoliasearch = require('algoliasearch');

var client = algoliasearch(process.env.ALGOLIA_API_APP, process.env.ALGOLIA_API_KEY);
var index = client.initIndex(process.env.ALGOLIA_API_INDEX);



// bot.on('text', (msg) => msg.reply.text(msg.text)); // echos text

bot.on('inlineQuery', function(msg) {

    let query = msg.query;
    if (!query || query.length === 0) {
        return null;
    }
    console.log(`inline query: ${ query }`);

    // Create a new answer list object
    const answers = bot.answerList(msg.id, {cacheTime: 60});

    index.search(msg.text, function(err, content) {
        console.log(content.hits);
        //var firstResult = content.hits[0];
        //msg.reply.text(firstResult.threadTitle);
        content.hits.map(function(result) {
            answers.addArticle({
                id: result.objectID,
                title: result.threadTitle,
                description: result.threadAuthor+" :"+result.firstPostText,
                url: "https://forum.xda-developers.com"+result.url,
                message_text: 'Click!'
            });
        });

        return bot.answerQuery(answers);

    });

});

bot.start();

