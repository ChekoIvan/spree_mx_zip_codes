module MxZipCodes::OrderDecorator

    Spree::Order.state_machine.before_transition to: :delivery do |order|
        valid = false
        if Spree::ZipCode.exists?(code: order.ship_address.zipcode)
            zip_code = Spree::ZipCode.where(code: order.ship_address.zipcode).first
            if !zip_code.status
                order.errors.add(:base, Spree.t(:shipping_zip_code_check_fail))   
            elsif zip_code.price.nil?
                order.errors.add(:base, Spree.t(:shipping_zip_code_not_price))   
            else 
                valid = zip_code.status
            end
        else
            order.errors.add(:base, Spree.t(:shipping_zip_code_not_exists))
        end
        valid
    end

end
  
::Spree::Order.prepend(MxZipCodes::OrderDecorator)