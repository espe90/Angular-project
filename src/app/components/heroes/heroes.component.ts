import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private translate: TranslateService,
    private router: Router,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    this.heroes = await this.heroeService.getHeroes();
    await this.getTableConfiguration();
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
        this.heroes = this.heroeService.getHeroById(Number(data));
        break;
      case 'name':
        this.heroes = this.heroeService.filterHero(data);
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

  editHero(hero) {
    localStorage.setItem('selectedHero', JSON.stringify(hero));
    this.router.navigate(['heroes/' + hero.id + '/view']);
  }

  deleteHero(hero) {
    this.confirmationService.confirm({
      header: 'Delete confirmation',
      message: 'Are you sure you want to remove the hero ' + hero.name + '?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: async () => {
        let promise = await this.heroeService.deletedHero(hero);
        if (promise) {
          this.heroes = this.heroeService.getItemsLocalStorage();
          this.confirmationService.close();
        }
      },
      reject: () => {
        this.confirmationService.close();
      }
    });

  }

}
