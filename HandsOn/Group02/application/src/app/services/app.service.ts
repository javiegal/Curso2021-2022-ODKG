import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  ont = "http://www.group02.org/pd/ontology/PedestriansMadrid#";
  rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
  res = "http://group02.org/pd/resource/Street/";
  rdfs = "http://www.w3.org/2000/01/rdf-schema#";
  query = "PREFIX ont: <" + this.ont + ">\nPREFIX rdf: <" + this.rdf + ">\nPREFIX res: <" + this.res +
          ">\nPREFIX rdfs: <" + this.rdfs + ">\nSELECT ?label ?observation ?date ?pedestrians WHERE {\n" +
          "?measurement a ont:Measurement.\n?measurement ont:hasPedestrians ?pedestrians.\n" +
          "?measurement ont:isLocated ?measurement_point.\n?measurement ont:hasDate ?date.\n" +
          "?measurement_point ont:hasStreet ?street.\n?street rdfs:label ?label.\n" +
          "?measurement_point ont:hasObservation ?observation.\n";

  constructor(private http: HttpClient) { }

  public get(form?: any): Observable<any> {
    let query = this.query;
    if (form) {
      if (form.street) query += "?measurement_point ont:hasStreet res:" + form.street + ".\n";
      if (form.date) query += "FILTER (( ?date >= '" + form.date+ "T00:00:00Z'^^xsd:dateTime ) &&\n" +
        "        ( ?date <= '" + form.date+ "T23:59:59Z'^^xsd:dateTime )).\n";
      if (form.min) query += "FILTER( ?pedestrians >= " + form.min + ")";
      if (form.max) query += "FILTER( ?pedestrians <= " + form.max + ")";
      query += ((form.limit) ? "}LIMIT " + form.limit : "}LIMIT 10")
    } else {
      query += '}LIMIT 10'
    }
    return this.http.get<any>(`/api/sparql?query=${encodeURIComponent(query)}`)
  }
}
