import {Component, OnInit} from '@angular/core';
import {AppService} from "./services/app.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OpenDataWeb';
  formGroup!: FormGroup;
  streets = new FormControl()
  data: any;
  streetsList = [
    {key: 'PaseodeRecoletos', value: 'Paseo de Recoletos'},
    {key: 'GranVia', value: 'Gran Via'},
    {key: 'CarreradeSanJeronimo', value: 'Carrera de San Jeronimo'},
    {key: 'CalleToledo', value: 'Calle Toledo'},
    {key: 'CalleSanBernardo', value: 'Calle San Bernardo'},
    {key: 'CalleAlcala', value: 'Calle Alcala'},
    {key: 'AlbertoAguilera', value: 'Alberto Aguilera'},
    {key: 'RondadeValencia', value: 'Ronda de Valencia'},
    {key: 'CallePrincesa', value: 'Calle Princesa'},
    {key: 'CalleMayor', value: 'Calle Mayor'},
    {key: 'CalleHuertas', value: 'Calle Huertas'},
    {key: 'CalleHortaleza', value: 'Calle Hortaleza'},
    {key: 'CalleGenova', value: 'Calle Genova'},
    {key: 'CalleFuencarral', value: 'Calle Fuencarral'},
    {key: 'CalleBailen', value: 'Calle Bailen'},
    {key: 'CalleAtocha', value: 'Calle Atocha'},
    {key: 'PlazadelEmperador Carlos V', value: 'Plaza del Emperador Carlos V'},
  ];

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.setForm();
    this.appService.get().subscribe(
      (response: any) => {
        this.data = response.results.bindings
      }
    )
  }

  private setForm(): void {
    this.formGroup = this.formBuilder.group({
      street:  [],
      date:     [],
      min:      [],
      max:      [],
      limit:    []
    })
  }

  onSubmit(form: any): any {
    form.date = this.datePipe.transform(form.date, 'yyyy-MM-dd');
    this.appService.get(form).subscribe(
      (response: any) => {
        this.data = response.results.bindings
      }
    )
  }
}
