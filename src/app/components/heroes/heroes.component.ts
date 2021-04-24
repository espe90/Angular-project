import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Heroe } from 'src/app/models/heroe';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Heroe[];

  constructor(private heroeService: HeroeService,
    public translate: TranslateService) { }

  async ngOnInit() {
    this.heroes = await this.heroeService.getHeroes();
  }
  openNew() {

  }
  deleteProduct(heroe) {

  }
  editProduct(heroe) {

  }

}
