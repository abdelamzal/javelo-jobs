require 'json'

class Main
    #Lecture du fichier input.json
    def initialize(input)
        data_input = JSON.parse(File.read(input))
        @objectives = data_input['objectives']
        @progress_records = data_input['progress_records']
    end

    def sortie(output)
        #creation de l'objet de sortie
        data_output = {
            #parcourir le tableau progress_records , chaque element du tableau ici appelé p
            #calcul du pourcentage
            progress_records:@progress_records.map do |p|
                i = p['objective_id']
                resteCible = @objectives[i-1]['target'] -  @objectives[i-1]['start']
                effectuer = p['value'] - @objectives[i-1]['start']
                pourcentEffectue = (effectuer*100) / resteCible
                puts("id #{i}")
                puts("reste à effectuer #{resteCible}")
                puts("nb effectué depuis le départ #{effectuer}")
                puts("pourcentage effectué #{pourcentEffectue}")
                {
                    id:p['id'],
                    progress: pourcentEffectue
                }
            end
        }
        #creation du fichier output.json dans le dossier data
        File.open(output, 'w+') do |f|
            f.write(JSON.pretty_generate(data_output))
        end
        puts("\nFichier JSON créé dans le dossier data")
    end

end

Main.new('data/input.json').sortie('data/output.json')
