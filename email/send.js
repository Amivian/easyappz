const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '041695ddc2msh03ecff701bdb863p15a99ejsnfcf96e24fbff',
        'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
        "accept": "application/json",
        "useQueryString": true
    },
    data: '{"personalizations":[{"to":[{"email":"vivian.akpoke@trostechnologies.com"}],"subject":"Testing SendGrid Api!"}],"from":{"email":"easyappz@trostechnologies.com"},"content":[{"type":"text/plain","value":"EasyAppz,SendGrid!"}]}'
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});