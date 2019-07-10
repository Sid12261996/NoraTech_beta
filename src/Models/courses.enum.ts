
// Inorder to add or delete a Course from the list change it here and put the price on charge.ts and there you go,
// the new Course is added to every part of this program it is referred(the same goes for deletion too).
import {AbstractControl, ValidationErrors} from '@angular/forms';

export enum Courses {
  Angular = 'Angular',
  dotNet = '.NET',
  WebDev = 'Web Development',
  js = 'JavaScript',
  NodeJs = 'Node Js',
  db = 'DataBase',
  CEH = 'Certified Ethical Hacker',
  Testing = 'Software Testing'

}

export class Course {
  constructor() {
  }

  static stringToEnum(toConvert: string): string {
   const courses = Courses;
    for (const singleCourse of Object.keys(courses)) {
      if (Courses[singleCourse] == toConvert) {
        return singleCourse;
      }
    }
  }
 }

