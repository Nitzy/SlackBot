'use strict';

const request = require('superagent');
function handleWithResponse(res){
    console.log(res);
    return res.entities;
}

module.exports = function witClient(token) {
    const ask = function ask(message, cb){
        request.get('https://api.wit.ai/message')
        .set('Authorization' , 'Bearer' + token)
        .query({v: '24/07/2017'})
        .query({q: message})
        .query({access_token: token})
        .end((err, res) => {
            if (err) return cb(err);
            if (res.statusCode != 200 ) return cb('Expected 200 but' + res.statusCode);
            const withResponse = handleWithResponse(res.body);
            return cb(null , withResponse);
        });
        console.log('ask: ' + message);
        console.log('token: ' + token);
    }

    return{
        ask: ask
    }
}