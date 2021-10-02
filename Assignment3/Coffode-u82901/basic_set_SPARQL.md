🔹 1. Get all the classes

``` 
SELECT ?class
WHERE { ?class rdf:type rdfs:Class. }
```

[Result: #1 ](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=%0D%0ASELECT+%3Fclass%0D%0AWHERE+%7B%3Fclass+rdf%3Atype+rdfs%3AClass.%7D&format=text%2Fhtml&timeout=0&debug=on)

🔹 2. Get all the subclasses of the class Establishment

``` 
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?subclass
WHERE { ?subclass rdfs:subClassOf  vocab:Establishment.} 
``` 
[Result: #2 ](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Fsubclass%0D%0AWHERE+%7B%0D%0A%3Fsubclass+rdfs%3AsubClassOf++vocab%3AEstablishment%0D%0A%7D+&format=text%2Fhtml&timeout=0&debug=on)


🔹 3. Get all instances of the class City

``` 
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?class
WHERE { ?class rdf:type vocab:City.} 
``` 
[Result: # 3](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Fclass%0D%0AWHERE+%7B+%3Fclass+rdf%3Atype+vocab%3ACity.%7D+&format=text%2Fhtml&timeout=0&debug=on)


🔹 4.Get the number of inhabitants of Santiago de Compostela

4.1) Getting hold on predicates

``` 
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?all
WHERE { ?city rdf:type vocab:City.
?city ?all ?data} 

``` 

[Result: # 4.1](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Fall%0D%0AWHERE+%7B+%3Fcity+rdf%3Atype+vocab%3ACity.%0D%0A%3Fcity+%3Fall+%3Fdata%7D+%0D%0A%0D%0A%0D%0A&format=text%2Fhtml&timeout=0&debug=on)

4.2) using #hasInhabitantNumber

``` 
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?inhabitans
WHERE { vocab:Santiago_de_Compostela vocab:hasInhabitantNumber ?inhabitans } 

``` 

[Result: # 4.2](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Finhabitans%0D%0AWHERE+%7B+vocab%3ASantiago_de_Compostela+vocab%3AhasInhabitantNumber+%3Finhabitans+%7D+%0D%0A%0D%0A%0D%0A&format=text%2Fhtml&timeout=0&debug=on)


🔹 5. Get the number of inhabitants of Santiago de Compostela and Arzua

``` 
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?inhabitans_A, ?inhabitans_S
WHERE { vocab:Arzua vocab:hasInhabitantNumber ?inhabitans_A.
vocab:Santiago_de_Compostela vocab:hasInhabitantNumber ?inhabitans_S.
 } 
``` 

[Result: # 5](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Finhabitans_A%2C+%3Finhabitans_S%0D%0AWHERE+%7B+vocab%3AArzua+vocab%3AhasInhabitantNumber+%3Finhabitans_A.%0D%0Avocab%3ASantiago_de_Compostela+vocab%3AhasInhabitantNumber+%3Finhabitans_S.%0D%0A%0D%0A+%7D+%0D%0A%0D%0A%0D%0A&format=text%2Fhtml&timeout=0&debug=on)


🔹 6. Get all places, together with the number of inhabitants, ordered by the place name (ascending)

```
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?place, ?inhabitants
WHERE {
?place vocab:hasInhabitantNumber ?inhabitants.
} 
ORDER BY ?place ASC(?inhabitants)

``` 

[Result: # 6](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Fplace%2C+%3Finhabitants%0D%0AWHERE+%7B%0D%0A%3Fplace+vocab%3AhasInhabitantNumber+%3Finhabitants.%0D%0A%7D+%0D%0AORDER+BY+%3Fplace+ASC%28%3Finhabitants%29%0D%0A%0D%0A%0D%0A&format=text%2Fhtml&timeout=0&debug=on)


🔹 7. Get all instances of Locality together with their number of inhabitants (if this information exists)

``` 
PREFIX vocab: <http://GP-onto.fi.upm.es/exercise2#>
SELECT ?locality, ?inhabitants
WHERE {
?locality rdf:type/rdfs:subClassOf vocab:Locality. 
OPTIONAL {?locality vocab:hasInhabitantNumber ?inhabitants}
} 
``` 

[Result: # 7](http://sandbox.linkeddata.es/sparql?default-graph-uri=http%3A%2F%2Fsandbox.linkeddata.es%2FGrado_20122013&query=PREFIX+vocab%3A+%3Chttp%3A%2F%2FGP-onto.fi.upm.es%2Fexercise2%23%3E%0D%0ASELECT+%3Flocality%2C+%3Finhabitants%0D%0AWHERE+%7B%0D%0A%3Flocality+rdf%3Atype%2Frdfs%3AsubClassOf+vocab%3ALocality.+%0D%0AOPTIONAL+%7B%3Flocality+vocab%3AhasInhabitantNumber+%3Finhabitants%7D%0D%0A%7D+%0D%0A%0D%0A%0D%0A&format=text%2Fhtml&timeout=0&debug=on)


🔹 8. Get all places with more than 200.000 inhabitants

``` 
``` 

[Result: # ]()


🔹 9. Get postal address data for Pazo_Breogan (street, number, locality, province)

``` 
``` 

[Result: # ]()


🔹 10. Get all subclasses of class Location

``` 
``` 

[Result: # ]()


🔹 11. Get all instances of class Locality

``` 
``` 

[Result: # ]()


🔹 12. Describe the resource with rdfs:label "Madrid”

``` 
``` 

[Result: # ]()


🔹 13. Construct a graph that relates directly all touristic places with their provinces, using a new property called ”isIn”

``` 
``` 

[Result: # ]()


🔹 14. Check whether there is any instance of Town

``` 
``` 

[Result: # ]()
