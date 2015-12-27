// used locally to test if Stripe token was created
Stripe.setPublishableKey('pk_test_GQ6WKitkvhKn5Ce38ewonPhL');

var payment;

jQuery(function() {  
  return payment.setupForm();
});

payment = {
  setupForm: function() {
    return $('#new_order').submit(function() {
      $('input[type=submit]').attr('disabled', true);
      Stripe.card.createToken($('#new_order'), payment.handleStripeResponse);
      return false;
    });
  },
  handleStripeResponse: function(status, response) {
	    if (status === 200) {
	    	$('input[type=submit]').attr('disabled', false);
	      return alert(response.id);
	    } else {
	    	$('input[type=submit]').attr('disabled', false);
	      return alert(response.error.message);
	    }
	  }
	};