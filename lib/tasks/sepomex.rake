require 'ffaker'
require 'pathname'
require 'spree/sepomex'
require 'spree_sepomex'

namespace :spree_sepomex do
  desc 'ARREGLAR LOS ID de los datos de códigos postal'
  task load: :environment do
    if ARGV.include?('db:migrate')
      puts %Q{
Please run db:migrate separately from spree_sepomex:load.

Running db:migrate and spree_sepomex:load at the same time has been known to
cause problems where columns may be not available during sample data loading.

Migrations have been run. Please run 'rake spree_sepomex:load' by itself now.
      }
      exit(1)
    end

    SpreeSepomex::Engine.load_codigos_postales
  end
end
