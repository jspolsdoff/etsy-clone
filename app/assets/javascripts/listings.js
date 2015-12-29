Stripe.setPublishableKey('pk_test_GQ6WKitkvhKn5Ce38ewonPhL');

var listing;

jQuery(function() {
  return listing.setupForm();
});

listing = {
  setupForm: function() {
    return $('#new_listing').submit(function() {
      if ($('input').length > 6) {
        $('input[type=submit]').attr('disabled', true);
        Stripe.bankAccount.createToken($('#new_listing'), listing.handleStripeResponse);
        return false;
      }
    });
  },
  handleStripeResponse: function(status, response) {
    if (status === 200) {
      $('#new_listing').append($('<input type="hidden" name="stripeToken" />').val(response.id));
      return $('#new_listing')[0].submit();
    } else {
      $('#stripe_error').text(response.error.message).show();
      return $('input[type=submit]').attr('disabled', false);
    }
  }
};