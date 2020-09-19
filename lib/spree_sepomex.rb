require 'spree_core'
require 'spree/sepomex'

module SpreeSepomex
  class Engine < Rails::Engine
    engine_name 'spree_sepomex'

    # Needs to be here so we can access it inside the tests
    def self.load_codigos_postales
      Spree::Sepomex.load_file('codigos')
  
    end
  end
end
