'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'WRCUZJ7V2JFU2C6NSK34FFFF2QNWHY56';
const witClient = require('../server/witClient')(witToken);
const slackToken = 'xoxb-216300933701-HC7rG1wKdwVIQyXEEYm1O0G1';
const slackLogLevel = 'verbose';
const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAutheticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});

