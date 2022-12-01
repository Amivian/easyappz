// const axios = require("axios");

// const options = {
//     method: 'POST',
//     url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
//     headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '041695ddc2msh03ecff701bdb863p15a99ejsnfcf96e24fbff',
//         'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
//         "accept": "application/json",
//         "useQueryString": true
//     },
//     data: '{"personalizations":[{"to":[{"email":"vivian.akpoke@trostechnologies.com"}],"subject":"Testing SendGrid Api!"}],"from":{"email":"easyappz@trostechnologies.com"},"content":[{"type":"text/plain","value":"EasyAppz,SendGrid!"}]}'
// };

// axios.request(options).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

const paymentForm = document.getElementById('orderForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

var fullName = document.getElementById("fullname").value;
var email = document.getElementById("email-address").value;
var phone = document.getElementById("phone").value;
var address = document.getElementById("address").value;
var message = document.getElementById("message").value;



function payWithPaystack(orderInfo){
    e.preventDefault();
    let orderInfo = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        message: message,
      };
    let handler = PaystackPop.setup({
        key: 'pk_live_72b6f671a4f806a06600572b1a4c95506bb0d87d', // Replace with your public key
        email: document.getElementById("email-address").value,
        name: document.getElementById("fullname").value,
        amount: parseInt(document.getElementById("amount").innerHTML) * 100,
        currency: 'NGN',
        onClose: function () {
            alert('Window closed.');
        },
        callback: function (response) {
           sendMail(orderInfo);
            alert(
              "A confirmation email has been sent to your Inbox to confirm your booking."
            );
            let message = 'Payment complete! Reference: ' + response.reference;            
            alert(message);
        }
    });

    handler.openIframe();
}

function sendMail(orderInfo) {
    const axios = require("axios");

    const { fullName, email, phone, address, message } = orderInfo;
  
    const options = {
      method: "POST",
      url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
      headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '041695ddc2msh03ecff701bdb863p15a99ejsnfcf96e24fbff',
          'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
          "accept": "application/json",
          "useQueryString": true
      },     
      params: {
        txt_msg: `Thank you for your order! your order items are  - ${orderInfo}`,
        to: `${email}`,
        from: "easyappz",
        subject: "Order Confirmation",
        bcc: "vivian.akpoke@trostechnologiies.com",
        reply_to: "vivian.akpoke@trostechnologiies.com",
        html_msg: `<html><body><b>Dear ${fullName}</b>, <br/> <br/>This is to confirm your order for ${orderInfo}, below are your order details - <ul><li>Name - ${fullName}</li> <li>Email Address - ${email} </li> <li>Phone Number - ${phone}</li> <li>Service - ${address}</li><li>Spaces booked for- ${message}</li></ul> <br/>  Best Regards <br/> <br/><b>CeraCerni's Arthub</b></body></html>`,
        cc: "vivian.akpoke@trostechnologiies.com",
      },
      data: { key1: "value", key2: "value" },
    };
  
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        document.getElementById("fname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
        document.getElementById("message").value = "";
      })
      .catch(function (error) {
        console.error(error);
      });
  }