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
                        dureeTotal = (Date.parse(m['date']) - Date.parse(@objectives[i-1]['start_date'])).to_f 
                        dureeDeTravail = (Date.parse(p['date']) - Date.parse(@objectives[i-1]['start_date'])).to_f
                        attendu = ( ( dureeTotal/ (dureeDeTravail)) * (m['target'] - @objectives[i-1]['start']) ) + @objectives[i-1]['start']
                        difference = p['value'] - (attendu)
                        pourcentage = (difference*100.0) / (attendu)

                        #dureeDeTravail2 = (Date.parse(m['date']) - Date.parse(@objectives[i-1]['start_date'])).to_f
                        #attendu2 = ( (dureeDeTravail2 / (dureeTotal)) * (@objectives[i-1]['target'] - @objectives[i-1]['start']) ) + @objectives[i-1]['start']
                        #value2 = m['target']
                        #difference2 = p['value'] - value2
                        #pourcentage2 = (difference2*100.0) / (value2)

                        #pourcentageT =   ((difference - difference2) * 100.0) /(value2-attendu)

                        puts("diff 1 : #{difference}")
                        puts("attendu 1 : #{attendu}")
                        puts("excess 1: #{pourcentage.round}")

                        #puts("diff 2 : #{difference2}")
                        #puts("attendu 2 : #{value2}")
                        #puts("excess 2: #{pourcentage2.round}")

                        #puts("excess T: #{pourcentageT.round}")
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