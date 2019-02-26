require 'json'
require 'date'

class Main
    def initialize(input)
        data_input = JSON.parse(File.read(input))
        @objectives = data_input['objectives']
        @progress_records = data_input['progress_records']
        @milestones = data_input['milestones']
    end
    
    def sortie(output)
        data_output = {
            progress_records:@progress_records.map do |p|
                i = p['objective_id']
                #Todo: calucl de excess
                @milestones.each do |m|
                    if m['objective_id'] == p['objective_id']
                        dureeTotal = (Date.parse(@objectives[i-1]['end_date']) - Date.parse(@objectives[i-1]['start_date'])).to_f 
                        dureeDeTravail = (Date.parse(p['date']) - Date.parse(@objectives[i-1]['start_date'])).to_f
                        attendu = ( (dureeDeTravail / (dureeTotal)) * (@objectives[i-1]['target'] - @objectives[i-1]['start']) ) + @objectives[i-1]['start']
                        difference = p['value'] - (attendu)
                        pourcentage = (difference*100.0) / (attendu)

                        dureeDeTravail2 = (Date.parse(m['date']) - Date.parse(@objectives[i-1]['start_date'])).to_f
                        attendu2 = ( (dureeDeTravail2 / (dureeTotal)) * (@objectives[i-1]['target'] - @objectives[i-1]['start']) ) + @objectives[i-1]['start']
                        value2 = m['target']
                        difference2 = value2 - attendu2
                        pourcentage2 = (difference2*100.0) / (attendu2)

                        pourcentageT =   (pourcentage - pourcentage2)

                        puts("diff 1 : #{difference}")
                        puts("diff 2 : #{difference2}")
                        puts("attendu 1 : #{attendu}")
                        puts("attendu 2 : #{attendu2}")
                        puts("excess : #{pourcentageT.round}")
                    end
                end
                
                puts "\n"
                {
                    id:p['id'],
                    excess: "Je n'ai pas compris :( sorry"
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