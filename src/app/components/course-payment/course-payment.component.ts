import {Component, OnInit} from '@angular/core';
import {Course} from '../../../Models/courses';

@Component({
  selector: 'app-course-payment',
  templateUrl: './course-payment.component.html',
  styleUrls: ['./course-payment.component.css']
})
export class CoursePaymentComponent implements OnInit {

  constructor() {
  }
  courses = Object.values(Course.CourseView());

  step = 0;
  start = 0;

  ngOnInit() {

    console.log(this.courses);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
export interface CourseDetails {
  name: string;
  position: number;
}
const ELEMENT_DATA: CourseDetails[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
];
export class TableBasicExample {
  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;
}
