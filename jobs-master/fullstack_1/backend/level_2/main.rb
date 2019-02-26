require 'json'
require 'date'

class Main
    def initialize(input)
        data_input = JSON.parse(File.read(input))
        @objectives = data_input['objectives']
        @progress_records = data_input['progress_records']
    end
    
    def sortie(output)
        data_output = {
            progress_records:@progress_records.map do |p|
                i = p['objective_id']
                dureeTotal = (Date.parse(@objectives[i-1]['end_date']) - Date.parse(@objectives[i-1]['start_date'])).to_f 
                dureeDeTravail = (Date.parse(p['date']) - Date.parse(@objectives[i-1]['start_date'])).to_f
                attendu = ( (dureeDeTravail / (dureeTotal)) * (@objectives[i-1]['target'] - @objectives[i-1]['start']) ) + @objectives[i-1]['start']
                difference = p['value'] - (attendu)
                pourcentage = (difference*100.0) / (attendu)
                puts("\n")
                puts("#{dureeTotal}")
                puts("#{dureeDeTravail}")
                puts("#{attendu}")
                puts("#{difference}")
                {
                    id:p['id'],
                    excess:pourcentage.to_i
                }
            end
        }
        File.open(output, 'w+') do |f|
            f.write(JSON.pretty_generate(data_output))
        end
        puts("\nFichier JSON créé dans le dossier data")
        puts("\n")
    end

end

Main.new('data/input.json').sortie('data/output.json')
