import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
@Injectable({
    providedIn: 'root'
})

export class HeroeService {
    heroes: any[];
    constructor(private http: HttpClient) {
    }

    ngOnInit() { }

    async getHeroes(): Promise<Hero[]> {
        this.heroes = JSON.parse(localStorage.getItem('Heroes'));
        if (!this.heroes)
            this.heroes = await this.http.get<Hero>('assets/data/mock-heroes.json').toPromise().then(
                (resp: any) => resp);
        return this.heroes;
    }

    getHeroById(id: number): Hero[] {
        let heroes: any[];
        let hero = this.heroes.find(hero => (hero.id === id));
        if (hero) {
            heroes = [];
            heroes.push(hero);
        }
        return heroes;
    }

    filterHero(text: string): Hero[] {
        let heroes: any[] = [];
        this.heroes.forEach(hero => {
            if (String(hero.name).includes(text) || String(hero.name).toLocaleLowerCase().includes(String(text)))
                heroes.push(hero);
        });
        return heroes;
    }

    setItemLocalStorage() {
        localStorage.setItem('Heroes', JSON.stringify(this.heroes));
    }
}