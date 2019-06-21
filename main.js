const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs');
var chunks;
var copypasta;

try {  
    var help = fs.readFileSync('help.txt', 'utf8').toString();
    console.log(help);    
} catch(e) {
    console.log('Error:', e.stack);
}

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    
    if (receivedMessage.content.startsWith("g!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "image") {
        imageCommand(arguments, receivedMessage)
    } else if (primaryCommand == "copypasta") {
    	copypastaCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Sorry Jon, I don't understand that command. Try using `!help`")
    }
}

function helpCommand(arguments, receivedMessage) {
    receivedMessage.channel.send(help)
}

function imageCommand(arguments, receivedMessage) {
    const localFileAttachment = new Discord.Attachment('images/'+Math.floor((Math.random() * 22) + 1)+'.png')
    receivedMessage.channel.send(localFileAttachment)
}

function copypastaCommand(arguments, receivedMessage) {
	copypasta = fs.readFileSync('copypasta/'+Math.floor((Math.random() * 11) + 1)+'.txt','utf8')
	for (var i = 0, charsLength = copypasta.length; i < charsLength; i += 2000) {
	    receivedMessage.channel.send(copypasta.substring(i, i + 2000));
	}
}


bot_secret_token = "NTkxMzI2NDk4MjQyNDI5MDEw.XQvOkw.mZ-S5qqgA813nyfRVGzMoxxx6EM"

client.login(bot_secret_token)
