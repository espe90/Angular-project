import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: any;
  asyncCorrect: Promise<boolean>;

  constructor(
    private heroeService: HeroeService,
    public translate: TranslateService,
    public router: Router) { }

  async ngOnInit() {
    await this.heroeService.getHeroes().pipe(first()).toPromise().then(
      resp => {
        this.heroes = resp;
        this.asyncCorrect = Promise.resolve(true);
        this.heroeService.heroes = resp;
      }
    );
    console.log(this.heroeService.getHeroeById("4"));
  }
  openNew() {
    this.router.navigate(['heroes/new']);
  }
  filterInput(text: string) {
    this.heroes = this.heroeService.filterHeroe(text);
    console.log(this.heroes)
  }
  deleteProduct(heroe) {

  }
  editProduct(heroe) {

  }

}
