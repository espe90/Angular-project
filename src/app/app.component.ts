import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'heroes';
  menu: MenuItem[];
  asynCorrect: Promise<boolean>;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(environment.defaultLang);
  }

  async ngOnInit() {
    this.menu = [
      { label: 'List of Heroes', url: 'heroes' }
    ];
    this.asynCorrect = Promise.resolve(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.clear();
  }
}
