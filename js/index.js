var paymentForm = document.getElementById('orderForm');
paymentForm.addEventListener('submit', payWithPaystack, false);
function payWithPaystack() {
  e.preventDefault();
  var handler = PaystackPop.setup({
    key: 'pk_live_72b6f671a4f806a06600572b1a4c95506bb0d87d', // Replace with your public key
    email: document.getElementById('email-address').value,
    amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: 'YOUR_REFERENCE', // Replace with a reference you generated
    callback: function(response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onClose: function() {
      alert('Transaction was not completed, window closed.');
    },
  });
  handler.openIframe();
}



// if("serviceWorker" in navigator){
//     navigator.serviceWorker.register("../service_worker.js").then(registration=>{
//       console.log("SW Registered!");
//     }).catch(error=>{
//       console.log("SW Registration Failed");
//     });
// }else{
//   console.log("Not supported");
// }