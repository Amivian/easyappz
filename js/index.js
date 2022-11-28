var createOrderUrl = document.querySelector('#personalData').dataset.createOrderUrl;
var returnUrl = document.querySelector('#personalData').dataset.returnUrl;
var currency = document.querySelector('#personalData').dataset.currency;

function confirmGuestOrder(event) {
    event.preventDefault();
    var valid = formValidate();
    if (valid) {
        var itemsArray = [];
        var shippingPrice = $('.transfer').text();
        shippingPrice = shippingPrice.replace('₦', '');
        var totalAmt = $('#totalOrderSummary').val();
        totalAmt = totalAmt.replace('₦', '');
        $('#itemList li').each(function (index) {
            var imagePath = $(this).find('.order-list-img img').attr('src');
            var title = $(this).find('.order-list-details h4').html();
            var quantity = $(this).find('input[name=qty]').val();
            var itemTotalPrice = $(this).find('.order-list-price').text();
            itemTotalPrice = (itemTotalPrice.match(/[0-9.]+/g)) * 1;
            var itemPrice = itemTotalPrice / quantity;
            var arr = title.split('<br>');
            var productName = arr[0];
            itemsArray.push({
                'name': productName,
                'unit_price': itemPrice,
                'quantity': quantity
            });
        });
        $('#submitPayment').html('Processing...').css('text-align', 'left');
        $('.spinner-icon').show();
        $.ajax({
            contentType: 'application/json',
            url: createOrderUrl,
            type: 'POST',
            data: JSON.stringify({
                items: [
                    itemsArray
                ],
                email: document.getElementById('email-address').value,
                name: document.getElementById('first-name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                message: document.getElementById('message').value,

                totalAmount: totalAmt,
                shippingTotal: shippingPrice,
                currency: currency
            }),
            success: function (data) {
                if (data != 'error') {
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
                        let message = 'Payment complete! Reference: ' + response.reference;
                        alert(message);
                        }
                    });
                    
                    handler.openIframe();
                    }
                } else {
                    console.log('Unable to create a checkout session. Please try again.');
                    $('#submitPayment').html('Submit');
                    $('.spinner-icon').hide();
                }
            }
        });
    }

}