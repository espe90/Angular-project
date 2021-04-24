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

    getHeroeById(id): Heroe {
        return this.heroes.find(heroe => (heroe.id === id));
    }

    filterHeroe(text: string): Heroe[] {
        let heroes: any[] = [];
        this.heroes.forEach(heroe => {
            if (String(heroe.name).includes(text) || String(heroe.name).toLocaleLowerCase().includes(String(text)))
                heroes.push(heroe);
        });
        return heroes;
    }
}