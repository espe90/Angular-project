export class Heroe {
    id?: number;
    name: string;
    gender: string;
    height: number;
    publisher: string;
    alignment: string;


    constructor() {
        this.name = '';
        this.gender = '';
        this.height = 0;
        this.publisher = '';
        this.alignment = '';
    }
}