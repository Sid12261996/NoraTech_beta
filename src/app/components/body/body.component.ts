import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
  }

}
