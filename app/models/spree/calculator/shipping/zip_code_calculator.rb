module Spree
  module Calculator::Shipping
  class ZipCodeCalculator < ShippingCalculator
    def self.description
      # Human readable description of the calculator
      Spree.t(:shipping_zip_code_check)
    end
  
    def compute_package(package)
      # Returns the value after performing the required calculation

      if !Spree::ZipCode.exists?(code: package.order.ship_address.zipcode) 
        return nil
      end
        
      zipcode = Spree::ZipCode.where(code: package.order.ship_address.zipcode).first

      zipcode.price

    end
  end
 end
end