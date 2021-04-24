import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeroeComponent } from './view-heroe.component';

describe('ViewHeroeComponent', () => {
  let component: ViewHeroeComponent;
  let fixture: ComponentFixture<ViewHeroeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHeroeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
