import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Heroe } from 'src/app/models/heroe';

@Component({
  selector: 'app-new-heroe',
  templateUrl: './new-heroe.component.html',
  styleUrls: ['./new-heroe.component.scss']
})
export class NewHeroeComponent implements OnInit {
  @ViewChild('newHeroe', { static: false }) newHeroe: NgForm;
  newHeroeForm = new FormGroup({});
  room: any;
  asyncCorrect: Promise<boolean>;
  heroeObj: Heroe = new Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
