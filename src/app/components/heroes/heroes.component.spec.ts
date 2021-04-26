import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { HeroeService } from 'src/app/services/heroe.service';
import { HeroesComponent } from './heroes.component';


describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let heroeService: jasmine.SpyObj<HeroeService>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient]
          }
        }),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ConfirmationService,
        MessageService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    httpSpy = TestBed.get(HttpClient);
    heroeService = TestBed.get(HeroeService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTableConfiguration()', () => {
    let tableData = {
      cols: [],
      rows: 5
    };
    spyOn(httpSpy, 'get').and.returnValue(of(tableData));
    expect(component.getTableConfiguration());
  });

  it('should call reset()', () => {
    expect(component.reset());
  });

  it('should call openNew()', () => {
    expect(component.openNew());
  });

  it('should call editHero()', () => {
    let hero = {};
    expect(component.editHero(hero));
  });

  it('should call deleteHero()', () => {
    let confirmService = fixture.debugElement.injector.get(ConfirmationService);
    let hero = {};
    expect(component.deleteHero(hero));
    spyOn<any>(confirmService, 'confirm').and.callFake((params: any) => {
      params.accept();
    });
  });

  it('should call filterInput() id type', () => {
    spyOn(heroeService, 'getHeroById');
    expect(component.filterInput('3', 'id'));
  });

  it('should call filterInput() name type', () => {
    spyOn(heroeService, 'filterHero');
    expect(component.filterInput('heroe', 'name'));
  });

  it('should call filterInput() other type', () => {
    expect(component.filterInput('test', 'test'));
  });
});
