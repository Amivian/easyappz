const paymentForm = document.getElementById('orderForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack(e) {
e.preventDefault();

let handler = PaystackPop.setup({
    key: 'pk_live_72b6f671a4f806a06600572b1a4c95506bb0d87d', // Replace with your public key
    email : document.getElementById("email-address").value,
    name: document.getElementById("fullname").value,
    amount : parseInt(document.getElementById("amount").innerHTML) * 100,
    currency: 'NGN',
    // ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
    alert('Window closed.');
    },
    callback: function(response){
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
            let message = 'Payment complete! Reference: ' + response.reference;
            alert(message);
        }).catch(function (error) {
            console.error(error);
        });
    }
});

handler.openIframe();
}