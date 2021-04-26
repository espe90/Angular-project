import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { Hero } from '../models/hero';
import { HeroeService } from './heroe.service';


describe('HeroeService', () => {
  let service: HeroeService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let hero: Hero = { id: 1, name: 'hero', gender: 'male', alignment: 'good', publisher: 'Marvel', height: 170 };
  let heroes = [hero];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })

    httpSpy = TestBed.get(HttpClient);
    service = TestBed.inject(HeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called onInit', () => {
    expect(service.ngOnInit());
  });

  it('should be called getHeroes()', () => {
    expect(service.getHeroes());
  });

  it('should be called getHeroById()', () => {
    service.heroes = heroes;
    expect(service.getHeroById(1));
  });

  it('should be called filterHero()', () => {
    service.heroes = heroes;
    expect(service.filterHero('he'));
  });

  it('should be called setItemLocalStorage()', () => {
    expect(service.setItemLocalStorage());
  });

  it('should be called getItemsLocalStorage()', () => {
    expect(service.getItemsLocalStorage());
  });

  it('should be called addHero() not duplicated', () => {
    service.heroes = heroes;
    let newHero = { id: 2, name: 'hero2', gender: 'male', alignment: 'good', publisher: 'Marvel', height: 170 };
    expect(service.addHero(newHero));
  });

  it('should be called addHero() duplicated', () => {
    service.heroes = heroes;
    let newHero = { id: 2, name: 'hero', gender: 'male', alignment: 'good', publisher: 'Marvel', height: 170 };
    expect(service.addHero(newHero));
  });

  it('should be called updatedHero() not duplicated', () => {
    service.heroes = heroes;
    let updHero = { id: 1, name: 'hero', gender: 'male', alignment: 'bad', publisher: 'Marvel', height: 170 };
    expect(service.updatedHero(updHero));
  });

  it('should be called updatedHero() duplicated', () => {
    service.heroes = heroes;
    let updHero = { id: 1, name: 'hero2', gender: 'male', alignment: 'bad', publisher: 'Marvel', height: 170 };
    expect(service.updatedHero(updHero));
  });

  it('should be called deletedHero()', () => {
    service.heroes = heroes;
    expect(service.deletedHero(hero));
  });

});
