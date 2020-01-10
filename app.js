var request = require('request')

var loginUrl = 'https://shareous1.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName'
var getBslUrl = 'https://shareous1.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues'

var body = {
    "password": '',
    "applicationId": "d89443d2-327c-4a6f-89e5-496bbb0317db",
    "accountName": ''
};

var headers = {
    'User-Agent': 'Dexcom Share/3.0.2.11 CFNetwork/711.2.23 Darwin/14.0.0',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

var req = { uri: loginUrl, body: body, json: true, headers: headers, method: 'POST', rejectUnauthorized: false };

request(req, function (error, result, body) {
    if (error) {
        console.error(error)
    } else {
        var bslUrl = getBslUrl + '?sessionId=' + body + '&minutes=1440&maxCount=1'
        var req = { uri: bslUrl, json: true, headers: headers, method: 'POST', rejectUnauthorized: false };
        request(req, function (error, result, body) {
            if (error) {
                console.error(error);
            } else {
                console.log(body[0].Value)
            }
        });
    }
});



