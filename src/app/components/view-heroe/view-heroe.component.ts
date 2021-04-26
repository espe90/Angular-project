import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Hero } from 'src/app/models/hero';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-view-heroe',
  templateUrl: './view-heroe.component.html',
  styleUrls: ['./view-heroe.component.scss']
})
export class ViewHeroeComponent implements OnInit {
  @ViewChild('viewHero', { static: false }) viewHero: NgForm;
  viewHeroForm = new FormGroup({});
  asyncCorrect: Promise<boolean>;
  heroObj: Hero = new Hero;
  oldHero: any;

  json: any;
  valueSelect: Map<string, any> = new Map<string, any>();

  constructor(
    public http: HttpClient,
    public heroeService: HeroeService,
    private messageService: MessageService) { }

  async ngOnInit() {
    if (localStorage.getItem('selectedHero')) {
      this.oldHero = JSON.parse(localStorage.getItem('selectedHero'));
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
        name: "Select a type",
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
        name: "Select a type",
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
        this.viewHeroForm.addControl(label.mappingDTO, new FormControl({ name: select.name, code: select.code }, required));
      } else
        this.viewHeroForm.addControl(label.mappingDTO, new FormControl(this.oldHero[label.mappingDTO], required));
    });
    this.asyncCorrect = Promise.resolve(true);
  }

  setValueSelect(value, area: string) {
    this.heroObj[area] = value.code;
  }

  async findSelect(element: any) {
    let values: any[] = this.valueSelect.get(element.mappingDTO);
    if (this.oldHero[element.mappingDTO] == '')
      this.oldHero[element.mappingDTO] = null;
    let select: any = values.find(value => (value.code === this.oldHero[element.mappingDTO]));
    if (select)
      return select;
    else {
      let select: any = values.find(value => (value.name === this.oldHero[element.mappingDTO]));
      return select;
    }
  }

  updatedHero() {
    this.heroObj.id = this.oldHero.id;
    this.heroObj.name = this.viewHeroForm.get('name').value;
    this.heroObj.height = this.viewHeroForm.get('height').value;
    this.heroObj.publisher = this.viewHeroForm.get('publisher').value;
    this.heroObj.gender = (this.viewHeroForm.get('gender').value).code;
    this.heroObj.alignment = (this.viewHeroForm.get('alignment').value).code;


    let oldHero = this.heroeService.heroes.find(heroe => heroe.id == this.heroObj.id);
    let index;

    let exists = this.heroeService.heroes.find(he => (oldHero.name !== this.heroObj.name && he.name === this.heroObj.name));

    if (exists)
      this.messageService.add({ severity: 'error', summary: '', detail: 'This hero already exists' });
    else {
      index = this.heroeService.heroes.indexOf(oldHero);
      this.heroeService.heroes.splice(index, 1);
      this.heroeService.heroes.push(this.heroObj);
      this.heroeService.setItemLocalStorage();

      this.messageService.add({ severity: 'success', summary: '', detail: 'Hero updated successfully' });
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
    localStorage.removeItem('selectedHero');
  }

}
