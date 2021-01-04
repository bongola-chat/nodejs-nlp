const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en', 'fr'], forceNER: true });

// Adds the utterances and intents for the NLP
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');
// French data
manager.addDocument('fr', 'Salut', 'salut');
manager.addDocument('fr', 'Hey', 'salut');
manager.addDocument('fr', 'Bonjour', 'salut');
manager.addDocument('fr', 'Salut, Comment ca va?', 'salut.question');
manager.addDocument('fr', 'Bonjour, Comment vas-tu?', 'salut.question');

manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'see you soon!');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');

manager.addAnswer('fr', 'salut', 'Salut');
manager.addAnswer('fr', 'salut', 'Bonjour!');
manager.addAnswer('fr', 'salut.question', 'Très bien, merci');
manager.addAnswer('fr', 'salut.question', 'Comme ci, Comme ca');

// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
})();

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var userInput = "";

// Getting the input
console.log("\n\nYou : ")
rl.question("You: ", async function(input) {
	// Prediction of the response
	const response = await manager.process(input);
  console.log(response);
	rl.close();
});

rl.on('close', function(){
	process.exit(0);
});