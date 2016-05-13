var Request = require('request');
var Promise = require('bluebird');

var appConst = require('../constants/appConstants');
var endPoints = require('../constants/endPoints');


var AuthService = {
    login: function(credits) {
        return new Promise(function(resolve, reject){
            Request.post(
                {
                    url: endPoints.LOGIN_URL,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'User-Agent': appConst.USER_AGENT},
                    form: {chipcard_num: credits.chipcard_num, mac_address: credits.mac_address}
                },
                function(err, response, body){
                    if (err) {
                        return reject(err);
                    }
                    if (response.statusCode >= 400) {
                        return reject(body);
                    }
                    return resolve(body);
                }
            );
        });
    }
};

module.exports = AuthService;
