import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../models/heroe';
@Injectable({
    providedIn: 'root'
})

export class HeroeService {
    heroes: any[];
    constructor(private http: HttpClient) {
    }

    ngOnInit() { }

    async getHeroes(): Promise<Heroe[]> {
        this.heroes = JSON.parse(localStorage.getItem('Heroes'));
        if (!this.heroes)
            this.heroes = await this.http.get<Heroe>('assets/data/mock-heroes.json').toPromise().then(
                (resp: any) => resp);
        return this.heroes;
    }

    getHeroeById(id: number): Heroe[] {
        let heroes: any[];
        let heroe = this.heroes.find(heroe => (heroe.id === id));
        if (heroe) {
            heroes = [];
            heroes.push(heroe);
        }
        return heroes;
    }

    filterHeroe(text: string): Heroe[] {
        let heroes: any[] = [];
        this.heroes.forEach(heroe => {
            if (String(heroe.name).includes(text) || String(heroe.name).toLocaleLowerCase().includes(String(text)))
                heroes.push(heroe);
        });
        return heroes;
    }

    setItemLocalStorage() {
        localStorage.setItem('Heroes', JSON.stringify(this.heroes));
    }
}