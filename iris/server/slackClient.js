'use strict';
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;

function handleOnAuthenticated(rtmStartData){
 console.log(`logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`)
}

function handleOnMessage(message){
    nlp.ask(message.text, (err, res) => {
        if (err){
            console.log(err);
            return;
        }
        if (!res.intent){
            return rtm.sendMessage("Sorry, I dont know what youre talking about?",message.channel);
        } else if(res.intent[0].value == 'time' && res.location){
            return rtm.sendMessage(`I dont know the time in ${res.location[0].value}.`,message.channel);
        } else {
            console.log(res);
            return rtm.sendMessage("Sorry, I dont know what youre talking about?",message.channel);
        }
        rtm.sendMessage('Sorry i did not understand.', message.channel, function messageSent(){});
    });
}

function addAutheticatedHandler(rtm , handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, loglevel, nlpClient){
rtm = new RtmClient(token, {loglevel:loglevel});
nlp = nlpClient;
addAutheticatedHandler(rtm, handleOnAuthenticated);
rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
return rtm;
}

module.exports.addAutheticatedHandler = addAutheticatedHandler;
