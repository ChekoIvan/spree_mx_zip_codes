# SpreeMxZipCodes

Introduction goes here.

## Installation

1. Add this extension to your Gemfile with this line:

    ```ruby
    gem 'spree_mx_zip_codes', github: '[your-github-handle]/spree_mx_zip_codes'
    ```

2. Install the gem using Bundler

    ```ruby
    bundle install
    ```

3. Copy & run migrations

    ```ruby
    bundle exec rails g spree_mx_zip_codes:install
    ```
4. Corregir los id de los estados ya agregados, para coincidir con los datos de sepomex
    ```ruby
    bundle exec rake spree_sepomex:load
    ```
    En producción, debe hacerse desde el "current" (Del deploy con Capistrano). Anteponiendo la variable: RAILS_ENV=production
    ```
    RAILS_ENV=production bundle exec rake spree_sepomex:load
    ```

5. Restart your server

  If your server was running, restart it so that it can find the assets properly.


### Procedimiento manual para activar los códigos postales

  Correr la consola de rails. (En current, cuando es en el servidor de producción)
  ```ruby
  RAILS_ENV=production rails console
  ```
  Seleccionar el código postal con ActiveRecord
  ```ruby
  Spree::ZipCode.where(code: "XXXXX").update(status: true )
  ```


## Testing

First bundle your dependencies, then run `rake`. `rake` will default to building the dummy app if it does not exist, then it will run specs. The dummy app can be regenerated by using `rake test_app`.

```shell
bundle
bundle exec rake
```

When testing your applications integration with this extension you may use it's factories.
Simply add this require statement to your spec_helper:

```ruby
require 'spree_mx_zip_codes/factories'
```

## Contributing

If you'd like to contribute, please take a look at the
[instructions](CONTRIBUTING.md) for installing dependencies and crafting a good
pull request.

Copyright (c) 2020 [name of extension creator], released under the New BSD License

- [X] Crear la tabla de codigos postales
- [X] Asociar codigo postal con el id de estados
- [X] Crear el endpoint para busqueda por id de estado
- [X] Modificar la vista para mostrar un selector en el lugar del zipcode
- [X] Agregar javascript para listado de codigos postales.
- [ ] Crear la vista para el admin

Opcionales: 

- [ ] Agregar a México como id 1 en la tabla de países (hacer el initializer o dejarlo como default)
- [ ] Pasar los seeders a esta gema. 