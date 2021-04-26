import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Heroe } from 'src/app/models/heroe';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-new-heroe',
  templateUrl: './new-heroe.component.html',
  styleUrls: ['./new-heroe.component.scss']
})
export class NewHeroeComponent implements OnInit {
  @ViewChild('newHeroe', { static: false }) newHeroe: NgForm;
  newHeroeForm = new FormGroup({});
  asyncCorrect: Promise<boolean>;
  heroeObj: Heroe = new Heroe;

  json: any;
  valueSelect: Map<string, any> = new Map<string, any>();

  constructor(
    public http: HttpClient,
    public heroeService: HeroeService,
    private messageService: MessageService) { }

  async ngOnInit() {
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
    elements.forEach(label => {
      let required;
      if (label.required)
        required = Validators.required;

      if (label.tag === 'input' && label.type === 'number')
        this.newHeroeForm.addControl(label.mappingDTO, new FormControl(label.min, required));
      else
        this.newHeroeForm.addControl(label.mappingDTO, new FormControl('', required));
    });
    this.asyncCorrect = Promise.resolve(true);
  }

  setValueSelect(value, area: string) {
    this.heroeObj[area] = value.code;
  }

  saveHeroe() {
    this.heroeObj.name = this.newHeroeForm.get('name').value;
    this.heroeObj.height = this.newHeroeForm.get('height').value;
    this.heroeObj.publisher = this.newHeroeForm.get('publisher').value;

    this.heroeObj.id = this.heroeService.heroes[this.heroeService.heroes.length - 1].id + 1;

    let exists = this.heroeService.heroes.find(heroe => heroe.name === this.heroeObj.name);

    if (exists)
      this.messageService.add({ severity: 'error', summary: '', detail: 'This hero already exists' });
    else {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Hero created correctly' });

      this.heroeService.heroes.push(this.heroeObj);
      this.heroeService.setItemLocalStorage();

      setTimeout(() => {
        this.cancel();
      }, 2000);
    }
  }

  cancel() {
    window.history.back();
  }
}
