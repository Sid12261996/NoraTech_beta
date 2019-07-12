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
  js: `JavaScript (/ˈdʒɑːvəˌskrɪpt/),[8] often abbreviated as JS, is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.
// tslint:disable-next-line:max-line-length
Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.[9] JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it,[10] and major web browsers have a dedicated JavaScript engine to execute it.



As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.



Initially only implemented client-side in web browsers, JavaScript engines are now embedded in many other types of host software, including server-side in web servers and databases, and in non-web programs such as word processors and PDF software, and in runtime environments that make JavaScript available for writing mobile and desktop applications, including desktop widgets.\`,`,
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
