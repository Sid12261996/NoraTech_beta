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

  ngOnInit() {

    console.log(this.courses);
  }

}
