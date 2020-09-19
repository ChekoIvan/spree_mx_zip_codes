Spree::Core::Engine.add_routes do
  # Add your extension routes here
  namespace :api, defaults: { format: 'json' } do
    namespace :v2 do
      namespace :storefront do
        resources :zip_codes, only: [:show]
        get '/zip_codes/:id', to: 'zip_codes#show', as: :zip_codes
      end
    end
  end 
end
