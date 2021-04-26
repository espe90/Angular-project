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
import { ViewHeroeComponent } from './view-heroe.component';


describe('ViewHeroeComponent', () => {
  let component: ViewHeroeComponent;
  let fixture: ComponentFixture<ViewHeroeComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let heroeSpy: jasmine.SpyObj<HeroeService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHeroeComponent],
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
    fixture = TestBed.createComponent(ViewHeroeComponent);
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

  it('should call setValueSelect()', () => {
    expect(component.setValueSelect('male', 'gender'));
  });

  it('should call initializeForm()', () => {
    let labels = [
      { label: "label1", tag: 'input', type: 'text', mappingDTO: 'name', required: true },
      { label: "label2", tag: 'select', mappingDTO: 'gender', required: true }
    ];
    expect(component.getGender());
    let label = { label: "gender", tag: 'select', mappingDTO: 'gender', required: true };
    component.getGender();

    let oldHero = { gender: { name: 'male', code: 'male' } };
    component.oldHero = oldHero;
    component.findSelect(labels[1]);
    expect(component.initializeForm(labels));
  });

  it('should call findSelect() found element', () => {
    let label = { label: "gender", tag: 'select', mappingDTO: 'gender', required: true };
    component.getGender();

    let oldHero = { gender: '' };
    component.oldHero = oldHero;
    expect(component.findSelect(label));
  });

  it('should call findSelect() not found element', () => {
    let label = { label: "gender", tag: 'select', mappingDTO: 'gender', required: true };
    component.getGender();

    let oldHero = {};
    component.oldHero = oldHero;
    expect(component.findSelect(label));
  });


  it('should call updatedHero()', () => {
    let labels = [
      { label: "name", tag: 'input', type: 'text', mappingDTO: 'name', required: true },
      { label: "height", tag: 'input', type: 'number', mappingDTO: 'height', min: '1', required: true },
      { label: "publisher", tag: 'select', mappingDTO: 'publisher', required: true },
      { label: "gender", tag: 'select', mappingDTO: 'gender', required: true },
      { label: "alignment", tag: 'select', mappingDTO: 'alignment', required: true }
    ];

    let oldHero = { id: 1, gender: { name: 'male', code: 'male' }, alingment: { name: 'good', code: 'good' } };
    component.oldHero = oldHero;

    expect(component.initializeForm(labels));

    spyOn(heroeSpy, 'updatedHero');

    expect(component.updatedHero());
  });

  it('should call cancel()', () => {
    expect(component.cancel());
  });
});
