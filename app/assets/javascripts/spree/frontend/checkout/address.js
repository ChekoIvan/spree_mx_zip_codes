Spree.ready(function ($) {
    Spree.onAddress = function () {
      if ($('#checkout_form_address').length) {
        Spree.updateState = function (region) {
          var countryId = getCountryId(region)
          if (countryId != null) {
            if (Spree.Checkout[countryId] == null) {
              $.ajax({
                async: false, method: 'GET', url: Spree.pathFor('/api/v2/storefront/countries/' + countryId + '?include=states'), dataType: 'json'
              }).done(function (data) {
                var json = data.included; var xStates = []
                for (var i = 0; i < json.length; i++) {
                  var obj = json[i]; xStates.push({ 'id': obj.id, 'name': obj.attributes.name })
                }
                Spree.Checkout[countryId] = {
                  states: xStates,
                  states_required: data.data.attributes.states_required,
                  zipcode_required: data.data.attributes.zipcode_required
                }
                Spree.fillStates(Spree.Checkout[countryId], region)
                Spree.toggleZipcode(Spree.Checkout[countryId], region)
              })
            } else {
              Spree.fillStates(Spree.Checkout[countryId], region)
              Spree.toggleZipcode(Spree.Checkout[countryId], region)
            }
          }
        }
        
        Spree.toggleZipcode = function (data, region) {
          var zipcodeRequired = data.zipcode_required
          var zipcodePara = $('#' + region + 'zipcode')
          var zipcodeInput = zipcodePara.find('input')
          var zipcodeSpanRequired = zipcodePara.find('abbr')
  
          if (zipcodeRequired) {
            zipcodeInput.prop('required', true)
            zipcodeSpanRequired.show()
            // zipcodeInput.prop('disabled', false)
            // zipcodePara.show()
          } else {
            zipcodeInput.val('')
            zipcodeInput.prop('required', false)
            zipcodeSpanRequired.hide()
            // zipcodeInput.prop('disabled', true)
            // zipcodePara.hide()
          }
        }
  
        Spree.fillStates = function (data, region) {
          var selected
          var statesRequired = data.states_required
          var states = data.states
          var statePara = $('#' + region + 'state')
          var stateSelect = statePara.find('select')
          var stateInput = statePara.find('input')
          var stateSpanRequired = statePara.find('abbr')
  
          if (states.length > 0) {
            selected = parseInt(stateSelect.val())
            stateSelect.html('')
            $.each(states, function (idx, state) {
              var opt = $(document.createElement('option')).attr('value', state.id).html(state.name)
              if (selected.toString(10) === state.id.toString(10)) {
                opt.prop('selected', true)
              }
              stateSelect.append(opt)
            })
            stateSelect.prop('required', false)
            stateSelect.prop('disabled', false).show()
            stateInput.hide().prop('disabled', true)
            statePara.show()
            stateSpanRequired.hide()
            stateSelect.removeClass('required')
  
            if (statesRequired) {
              stateSelect.addClass('required')
              stateSpanRequired.show()
              stateSelect.prop('required', true)
            }
            stateSelect.removeClass('hidden')
            stateInput.removeClass('required')
          } else {
            stateSelect.hide().prop('disabled', true)
            stateInput.show()
            if (statesRequired) {
              stateSpanRequired.show()
              stateInput.addClass('required form-control')
            } else {
              stateInput.val('')
              stateSpanRequired.hide()
              stateInput.removeClass('required')
            }
            statePara.toggle(!!statesRequired)
            stateInput.prop('disabled', !statesRequired)
            stateInput.removeClass('hidden')
            stateSelect.removeClass('required')
          }
        }

        Spree.updateZipcode = function (region) {
            var stateId =  $('#' + region + 'state select').val()
            if (stateId != null) {
            //   if (Spree.Checkout[stateId] == null) {
                $.ajax({
                  async: false, method: 'GET', url: Spree.pathFor('/api/v2/storefront/zip_codes/' + stateId + '?include=states'), dataType: 'json'
                }).done(function (data) {
                 Spree.fillZipcodes(data, region)
                //   Spree.fillStates(Spree.Checkout[stateId], region)
                //   Spree.toggleZipcode(Spree.Checkout[stateId], region)
                })
            //   } else {
                // Spree.fillStates(Spree.Checkout[stateId], region)
                // Spree.toggleZipcode(Spree.Checkout[stateId], region)
            //   }
            }
        }
        Spree.fillZipcodes = function (data, region) {
            var selected
            var zipcodeField = $('#' + region + 'zipcode')
            var zipcodeSelect = zipcodeField.find('select')
    
            // if (data.length > 0) {
              selected = parseInt(zipcodeSelect.val())
              zipcodeSelect.html('')
              
              $.each(data, function (index, zipcode) {
                var opt = $(document.createElement('option')).attr('value', zipcode.code).html(zipcode.code)
                if (selected.toString(10) === zipcode.code.toString(10)) {
                  opt.prop('selected', true)
                }
                zipcodeSelect.append(opt)
              })
   
            // }
          }
  


        $('#bcountry select').change(function () {
          Spree.updateState('b')
        })
        $('#scountry select').change(function () {
          Spree.updateState('s')
        })
        $('#bstate select').change(function () {
          Spree.updateZipcode('b')
        })
        $('#sstate select').change(function () {
          Spree.updateZipcode('s')
        })
        Spree.updateState('b')
        Spree.updateZipcode('b')

  
        var orderUseBilling = $('input#order_use_billing')
        orderUseBilling.change(function () {
          updateShippingFormState(orderUseBilling)
        })
        updateShippingFormState(orderUseBilling)
        

      }
      function updateShippingFormState (orderUseBilling) {
        if (orderUseBilling.is(':checked')) {
          $('#shipping .inner').hide()
          $('#shipping .inner input, #shipping .inner select').prop('disabled', true)
        } else {
          $('#shipping .inner').show()
          $('#shipping .inner input, #shipping .inner select').prop('disabled', false)
          Spree.updateState('s')
          Spree.updateZipcode('s')
        }
      }

      function getCountryId (region) {
        return $('#' + region + 'country select').val()
      }
    }
    Spree.onAddress()
  })
  