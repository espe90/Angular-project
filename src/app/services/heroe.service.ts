import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Hero } from '../models/hero';
@Injectable({
    providedIn: 'root'
})

export class HeroeService {
    heroes: any[];
    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
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

    getItemsLocalStorage(): any[] {
        return JSON.parse(localStorage.getItem('Heroes'));
    }

    addHero(heroObj: Hero): Promise<boolean> {
        return new Promise((resolve) => {
            let exists = this.heroes.find(hero => hero.name === heroObj.name);

            if (exists) {
                this.messageService.add({ severity: 'error', summary: '', detail: 'This hero already exists' });
                resolve(false);
            } else {
                this.messageService.add({ severity: 'success', summary: '', detail: 'Hero created correctly' });

                this.heroes.push(heroObj);
                this.setItemLocalStorage();
                resolve(true);
            }
        })
    }

    updatedHero(heroObj: Hero): Promise<boolean> {
        return new Promise((resolve) => {

            let oldHero = this.heroes.find(hero => hero.id == heroObj.id);
            let index;

            let exists = this.heroes.find(he => (oldHero.name !== heroObj.name && he.name === heroObj.name));

            if (exists) {
                this.messageService.add({ severity: 'error', summary: '', detail: 'This hero already exists' });
                resolve(false);
            } else {
                index = this.heroes.indexOf(oldHero);
                this.heroes.splice(index, 1);
                this.heroes.push(heroObj);
                this.setItemLocalStorage();

                this.messageService.add({ severity: 'success', summary: '', detail: 'Hero updated successfully' });
                resolve(true);
            }
        });
    }

    deletedHero(hero): Promise<boolean> {
        return new Promise((resolve) => {
            this.heroes = this.heroes.filter(he => he.id !== hero.id);
            this.setItemLocalStorage();

            this.messageService.add({ severity: 'success', summary: '', detail: 'Hero successfully eliminated' });
            resolve(true);
        });
    }

}