import requests
from urllib.parse import quote

selected_street = input("Street name: ")
selected_date = input("Date: ")
selected_min = input("Min: ")
selected_max = input("Max: ")

query = '''PREFIX ont: <http://www.group02.org/pd/ontology/PedestriansMadrid#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX res: <http://group02.org/pd/resource/Street/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?label ?observation ?date ?pedestrians WHERE  {
    ?measurement a ont:Measurement.
    ?measurement ont:hasPedestrians ?pedestrians.
    ?measurement ont:isLocated ?measurement_point.
    ?measurement ont:hasDate ?date.
    ?measurement_point ont:hasStreet ?street.
    ?street rdfs:label ?label.
    ?measurement_point ont:hasObservation ?observation.
'''

if selected_street != "":
    query += '''    ?measurement_point ont:hasStreet res:''' + selected_street + ".\n"
if selected_date != "":
    query += '''    FILTER(xsd.dateTime(?date) == ''' + selected_date + "^^xsd:dateTime).\n"
if selected_min != "" and selected_max != "":
    query += '''    FILTER(?pedestrians >= ''' + selected_min + ''').
    FILTER(?pedestrians <= ''' + selected_max + ").\n"

query += "}"

print("\nYour query:\n" + query)

response = requests.get("http://localhost:8080/sparql?query=" + quote(query))

# print(response.text)

for dict_resp in response.json()['results']['bindings']:
    print(dict_resp['label']['value'], dict_resp['observation']['value'], dict_resp['date']['value'], dict_resp['pedestrians']['value'])
