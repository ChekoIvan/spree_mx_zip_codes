module Spree
    module Api
      module V2
        module Storefront
          class ZipCodesController < ::Spree::Api::V2::BaseController
        
            include Spree::Api::V2::CollectionOptionsHelpers
  
            def show
              codes = Spree::ZipCode.where(status: true, state: params[:id])
              render json: codes.to_json
            end
  
            private
  
            # ESTA SECCION DE CODIGO ES PARA DAR DE ALTA SERIALIZERS Y DEMAS AJUSTES USADOS PARA SUS ENDPOINTS EN SPREE
  
          end
        end
      end
    end
  end