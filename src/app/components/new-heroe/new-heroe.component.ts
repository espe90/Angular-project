import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Hero } from 'src/app/models/hero';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-new-heroe',
  templateUrl: './new-heroe.component.html',
  styleUrls: ['./new-heroe.component.scss']
})
export class NewHeroeComponent implements OnInit {
  @ViewChild('newHero', { static: false }) newHero: NgForm;
  newHeroForm = new FormGroup({});
  asyncCorrect: Promise<boolean>;
  heroObj: Hero = new Hero;

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
        this.newHeroForm.addControl(label.mappingDTO, new FormControl(label.min, required));
      else
        this.newHeroForm.addControl(label.mappingDTO, new FormControl('', required));
    });
    this.asyncCorrect = Promise.resolve(true);
  }

  setValueSelect(value, area: string) {
    this.heroObj[area] = value.code;
  }

  async saveHero() {
    this.heroObj.name = this.newHeroForm.get('name').value;
    this.heroObj.height = this.newHeroForm.get('height').value;
    this.heroObj.publisher = this.newHeroForm.get('publisher').value;

    this.heroObj.id = this.heroeService.heroes[this.heroeService.heroes.length - 1].id + 1;

    let promise = await this.heroeService.addHero(this.heroObj);

    if (promise) {
      setTimeout(() => {
        this.cancel();
      }, 1000);
    }
  }

  cancel() {
    window.history.back();
  }
}
