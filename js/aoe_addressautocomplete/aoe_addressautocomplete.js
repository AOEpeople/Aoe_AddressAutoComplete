document.observe("dom:loaded", function() {
    var addressField = jQuery('#billing\\:street1').closest('li');
    var autocompleteField = addressField.clone();
    autocompleteField.find('input').attr('id', 'autocomplete').attr('name', 'aoe_addressautocomplete').removeClass('required-entry').attr('title', null);
    autocompleteField.find('label').attr('class', null).attr('for', 'aoe_addressautocomplete').text('Autocomplete');
    autocompleteField.find('em').hide()
    addressField.first().before(autocompleteField)

    var autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place);
        jQuery('#billing\\:street1').val(place.address_components[0]['long_name'] + ' ' + place.address_components[1]['long_name']);
        jQuery('#billing\\:city').val(place.address_components[3]['long_name']);
        jQuery('#billing\\:postcode').val(place.address_components[7]['long_name']);
        jQuery('#billing\\:country_id').val(place.address_components[6]['short_name']);
        jQuery("#billing\\:region_id").val(jQuery("#billing\\:region_id option[title='"+place.address_components[5]['long_name']+"']").attr('value'));
    });
});