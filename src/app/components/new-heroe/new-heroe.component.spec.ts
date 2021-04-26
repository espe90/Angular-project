import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { HeroeService } from 'src/app/services/heroe.service';
import { NewHeroeComponent } from './new-heroe.component';


describe('NewHeroeComponent', () => {
  let component: NewHeroeComponent;
  let fixture: ComponentFixture<NewHeroeComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let heroeSpy: jasmine.SpyObj<HeroeService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewHeroeComponent],
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
        MessageService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    httpSpy = TestBed.get(HttpClient);
    heroeSpy = TestBed.get(HeroeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getBuildingForm()', () => {
    let configForm = [];
    spyOn(httpSpy, 'get').and.returnValue(of(configForm));
    expect(component.getBuildingForm());
  });

  it('should call getGender()', () => {
    expect(component.getGender());
  });

  it('should call getAlignment()', () => {
    expect(component.getAlignment());
  });

  it('should call initializeForm()', () => {
    let labels = [
      { label: "label1", tag: 'input', type: 'text', mappingDTO: 'label1', required: true },
      { label: "label2", tag: 'input', type: 'number', mappingDTO: 'label2', min: '2', required: true }
    ];
    expect(component.initializeForm(labels));
  });

  it('should call setValueSelect()', () => {
    expect(component.setValueSelect('male', 'gender'));
  });

  it('should call cancel()', () => {
    expect(component.cancel());
  });

  it('should call saveHero()', () => {
    let labels = [
      { label: "name", tag: 'input', type: 'text', mappingDTO: 'name', required: true },
      { label: "height", tag: 'input', type: 'number', mappingDTO: 'height', min: '2', required: true },
      { label: "publisher", tag: 'input', type: 'text', mappingDTO: 'publisher', required: true }
    ];
    expect(component.initializeForm(labels));
    heroeSpy.heroes = [{ name: 'test' }];
    spyOn(heroeSpy, 'addHero');

    expect(component.saveHero());
  });

});
