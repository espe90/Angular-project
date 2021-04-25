import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Heroe } from 'src/app/models/heroe';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-view-heroe',
  templateUrl: './view-heroe.component.html',
  styleUrls: ['./view-heroe.component.scss']
})
export class ViewHeroeComponent implements OnInit {
  @ViewChild('viewHeroe', { static: false }) viewHeroe: NgForm;
  viewHeroeForm = new FormGroup({});
  asyncCorrect: Promise<boolean>;
  heroeObj: Heroe = new Heroe;
  oldHeroe: any;

  json: any;
  valueSelect: Map<string, any> = new Map<string, any>();

  constructor(
    public http: HttpClient,
    public heroeService: HeroeService,
    private messageService: MessageService) { }

  async ngOnInit() {
    if (localStorage.getItem('selectedHeroe')) {
      this.oldHeroe = JSON.parse(localStorage.getItem('selectedHeroe'));
    } else
      window.history.back();

    await this.getBuildingForm();
    this.getGender();
    this.getAlignment();
    this.initializeForm(this.json.labels);
  }

  async getBuildingForm() {
    return new Promise((resolve) => {
      this.http.get<any>('assets/json/formHeroes.json').subscribe(
        resp => {
          this.json = resp;
          resolve(true);
        }
      )
    });
  }

  getGender() {
    let gender = [
      {
        name: "Seleccione un tipo",
        code: null
      },
      {
        name: "Female",
        code: "female"
      },
      {
        name: "Male",
        code: "male"
      }
    ];
    this.valueSelect.set('gender', gender);
  }

  getAlignment() {
    let alignment = [
      {
        name: "Seleccione un tipo",
        code: null
      },
      {
        name: "Good",
        code: "good"
      },
      {
        name: "Bad",
        code: "bad"
      },
      {
        name: "Neutral",
        code: "neutral"
      }
    ];
    this.valueSelect.set('alignment', alignment);
  }

  initializeForm(elements: any[]) {
    elements.forEach(async label => {
      let required;
      if (label.required)
        required = Validators.required;
      if (label.tag === 'select') {
        let select = await this.findSelect(label);
        this.viewHeroeForm.addControl(label.mappingDTO, new FormControl({ name: select.name, code: select.code }, required));
      } else
        this.viewHeroeForm.addControl(label.mappingDTO, new FormControl(this.oldHeroe[label.mappingDTO], required));
    });
    this.asyncCorrect = Promise.resolve(true);
  }

  setValueSelect(value, area: string) {
    this.heroeObj[area] = value.code;
  }

  async findSelect(element: any) {
    let values: any[] = this.valueSelect.get(element.mappingDTO);
    if (this.oldHeroe[element.mappingDTO] == '')
      this.oldHeroe[element.mappingDTO] = null;
    let select: any = values.find(value => (value.code === this.oldHeroe[element.mappingDTO]));
    if (select)
      return select;
    else {
      let select: any = values.find(value => (value.name === this.oldHeroe[element.mappingDTO]));
      return select;
    }
  }

  updatedHeroe() {
    this.heroeObj.id = this.oldHeroe.id;
    this.heroeObj.name = this.viewHeroeForm.get('name').value;
    this.heroeObj.height = this.viewHeroeForm.get('height').value;
    this.heroeObj.publisher = this.viewHeroeForm.get('publisher').value;
    this.heroeObj.gender = (this.viewHeroeForm.get('gender').value).code;
    this.heroeObj.alignment = (this.viewHeroeForm.get('alignment').value).code;


    let oldHeroe = this.heroeService.heroes.find(heroe => heroe.id == this.heroeObj.id);
    let index;

    let existe = this.heroeService.heroes.find(he => (oldHeroe.name !== this.heroeObj.name && he.name === this.heroeObj.name));

    if (existe)
      this.messageService.add({ severity: 'error', summary: '', detail: 'Este héroe ya existe' });
    else {
      index = this.heroeService.heroes.indexOf(oldHeroe);
      this.heroeService.heroes.splice(index, 1);
      this.heroeService.heroes.push(this.heroeObj);
      this.messageService.add({ severity: 'success', summary: '', detail: 'Héroe actualizado correctamente' });
      setTimeout(() => {
        this.cancel();
      }, 2000);
    }
  }

  cancel() {
    this.removeStorage();
    window.history.back();
  }

  removeStorage() {
    localStorage.removeItem('selectedHeroe');
  }

}
