import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public authorName: string = 'Wisner Júnior :)';

  constructor() {
    // this.authorName = 'Diogo Fabri de Andrade';
  }

  ngOnInit() {
  }

}
