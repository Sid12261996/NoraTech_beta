import {CourseChargeSheet} from './course-charge-sheet';


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


const AboutCourse = {

  Angular: 'Angular is a good course',
  dotNet: '.NET  is a good course',
  WebDev: 'Web Development is a good course',
  js: 'JavaScript is a good course',
  NodeJs: 'Node Js is a good course',
  db: 'DataBase is a good course',
  CEH: 'Certified Ethical Hacker',
  Testing: 'Software Testing is a good course'

};

const CourseDuration = {
  Angular: 30,
  dotNet: 60,
  WebDev: 60,
  js: 30,
  NodeJs: 30,
  db: 30,
  CEH: 30,
  Testing: 60

};

export class Course {


  // Entities
  name: string;
  price: number;
  about: string;
  duration: number;

  constructor() {
  }

  public static CourseView(): Course[] {
    const courses = [];
    for (const item of Object.keys(Courses)) {
      const toAdd = new Course();
      toAdd.name = Courses[item];
      toAdd.about = AboutCourse[item];
      toAdd.price = CourseChargeSheet.CalculateChargeforAll(item);
      toAdd.duration = CourseDuration[item];
      courses.push(toAdd);
    }


    return courses;
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
