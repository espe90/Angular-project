import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../models/heroe';
@Injectable({
    providedIn: 'root'
})

export class HeroeService {
    heroes: any;
    constructor(private http: HttpClient) {
    }

    ngOnInit() { }

    getHeroes(): Observable<Heroe> {
        return this.http.get<Heroe>('assets/data/mock-heroes.json');
    }

    getHeroeById(id: number, data: Heroe[]): Heroe[] {
        let heroes: any[];
        let heroe = data.find(heroe => (heroe.id === id));
        if (heroe) {
            heroes = [];
            heroes.push(heroe);
        }
        return heroes;
    }

    filterHeroe(text: string, data: Heroe[]): Heroe[] {
        let heroes: any[] = [];
        data.forEach(heroe => {
            if (String(heroe.name).includes(text) || String(heroe.name).toLocaleLowerCase().includes(String(text)))
                heroes.push(heroe);
        });
        return heroes;
    }
}