const paymentForm = document.getElementById('orderForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack(e) {
e.preventDefault();

let handler = PaystackPop.setup({
    key: 'pk_live_72b6f671a4f806a06600572b1a4c95506bb0d87d', // Replace with your public key
    email : document.getElementById("email-address").value,
    amount : parseInt(document.getElementById("amount").innerHTML) * 100,
    currency: 'NGN',
    // ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
    alert('Window closed.');
    },
    callback: function(response){
        $.ajax({
            contentType: 'application/json',
            url: '../email/send.js',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data != 'error') {
                   let message = 'Payment complete! Reference: ' + response.reference;
                   alert(message);
                } else {
                    console.log('Unable to send mail. Please try again.');
                    $('#submitPayment').html('Submit');
                    $('.spinner-icon').hide();
                }
            }
        });
    }
});

handler.openIframe();
}