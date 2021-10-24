original_filepath = 'C:/Users/morot/OneDrive - Universidad de Castilla-La Mancha/Master/Open data and graphs/Ejercicios/git/Curso2021-2022-ODKG/HandsOn/Group12/csv/data.ttl'
new_filepath = 'C:/Users/morot/OneDrive - Universidad de Castilla-La Mancha/Master/Open data and graphs/Ejercicios/git/Curso2021-2022-ODKG/HandsOn/Group12/csv/data-cleaned.ttl'

with open(original_filepath, encoding='utf-8') as original_file:
   with open(new_filepath, 'w', encoding='utf-8') as new_file:
      line = original_file.readline()
      while line:
         if ('""' not in line) and ('<>' not in line):
            new_file.write(line.strip()+'\n')
         line = original_file.readline()