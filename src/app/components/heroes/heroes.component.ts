import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: any;
  asyncCorrect: Promise<boolean>;
  configTable: any;

  constructor(
    private heroeService: HeroeService,
    public translate: TranslateService,
    public router: Router,
    public http: HttpClient) { }

  async ngOnInit() {
    await this.getTableConfiguration();
    this.heroes = this.heroeService.heroes;
  }

  async getTableConfiguration() {
    return new Promise((resolve) => {
      this.http.get<any>('assets/json/configTableHeroes.json').subscribe(
        resp => {
          this.configTable = resp;
          this.asyncCorrect = Promise.resolve(true);
          resolve(true);
        }
      )
    }
    );
  }

  filterInput(data: string, type: string) {
    switch (type) {
      case 'id':
        this.heroes = this.heroeService.getHeroeById(Number(data), this.heroes);
        break;
      case 'name':
        this.heroes = this.heroeService.filterHeroe(data, this.heroes);
        break;
      default:
        break;
    }
  }
  reset() {
    this.heroes = this.heroeService.heroes;
  }

  openNew() {
    this.router.navigate(['heroes/new']);
  }

  editProduct(heroe) {
    localStorage.setItem('selectedHeroe', JSON.stringify(heroe));
    this.router.navigate(['heroes/' + heroe.id + '/view']);
  }

  deleteProduct(heroe) {

  }

}
