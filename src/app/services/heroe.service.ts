import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../models/heroe';

@Injectable({
    providedIn: 'root'
})

export class HeroeService {
    heroes: Heroe[];
    constructor(private http: HttpClient) {
    }

    ngOnInit() { }

    getHeroes(): Promise<Heroe[]> {
        return new Promise((resolve) => {
            this.http.get<Heroe[]>('assets/data/mock-heroes.json').toPromise().then(
                resp => { this.heroes = resp; resolve(resp) }
            ).catch(() => {
                console.log("No se ha encontrado el fichero");
            });
        })
    }
    getHeroeById(id: number): Promise<any> {
        return new Promise<any>(() => {
            this.http.get<any>('assets/data/mock-heroes.json');
        });
    }
}