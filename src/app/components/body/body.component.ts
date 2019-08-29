import {Component, OnInit} from '@angular/core';
import {HeaderServiceService} from '../../../Services/header-service.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
logo = environment['company-logo'];
  constructor(private hdr: HeaderServiceService) {

  }

  ngOnInit() {
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

}
