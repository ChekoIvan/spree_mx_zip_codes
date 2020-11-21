class AddPriceToSpreeZipCodes < ActiveRecord::Migration[6.0]
  def change
    add_column :spree_zip_codes, :price, :decimal, precision: 8, scale: 2
  end
end
