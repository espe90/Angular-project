import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba';
  menu: MenuItem[];
  asynCorrect: Promise<boolean>;

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang(environment.defaultLang);
  }

  ngOnInit() {
    this.menu = [
      { label: 'Listado de Héroes', url: 'heroes' }
    ];
    this.asynCorrect = Promise.resolve(true);
  }
}
