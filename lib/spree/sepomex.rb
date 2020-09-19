module Spree
    module Sepomex
      def self.load_file(file)
        # If file exists within application it takes precendence.
        path = if File.exist?(File.join(Rails.root, 'db', 'sepomex', "#{file}.rb"))
                 File.expand_path(File.join(Rails.root, 'db', 'sepomex', "#{file}.rb"))
               else
                 # Otherwise we will use this gems default file.
                 File.expand_path(samples_path + "#{file}.rb")
               end
        # Check to see if the specified file has been loaded before
        unless $LOADED_FEATURES.include?(path)
          require path
          puts "Loaded #{file.titleize} "
        end
      end
  
      def self.samples_path
        Pathname.new(File.join(File.dirname(__FILE__), '..', '..', 'db', 'sepomex'))
      end
    end
  end
  