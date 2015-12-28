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
	      $('#new_order').append($('<input type="hidden" name="stripeToken" />').val(response.id))
	      $('#new_order')[0].submit()
	    } else {
	    	$('input[type=submit]').attr('disabled', false);
	      $('#stripe_error').text(response.error.message).show();
	    }
	  }
	};