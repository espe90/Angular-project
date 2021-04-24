import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroeComponent } from './new-heroe.component';

describe('NewHeroeComponent', () => {
  let component: NewHeroeComponent;
  let fixture: ComponentFixture<NewHeroeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHeroeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
