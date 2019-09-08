
import {charges} from './charges';

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

  // tslint:disable-next-line:max-line-length
  Angular: `Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.
  Angular is a complete rewrite from the same team that built AngularJS.`,
  dotNet: `.NET is a free, cross-platform, open source developer platform for building many different types of applications.
With .NET, you can use multiple languages, editors, and libraries to build for web, mobile, desktop, gaming, and IoT.
Languages
You can write .NET apps in C#, F#, or Visual Basic.
C# is a simple, modern, object-oriented, and type-safe programming language.
F# is a cross-platform, open-source, functional programming language for .NET. It also includes object-oriented and imperative programming.
Visual Basic is an approachable language with a simple syntax for building type-safe, object-oriented apps.`,
  WebDev: 'Web Development is a good course',

  js: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.',

  NodeJs: `As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.For More Read <a href="https://nodejs.org/></a>`,
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
      if (Courses[singleCourse] === toConvert) {
        return singleCourse;
      }
    }
  }
}

export class CourseChargeSheet {
  private static CalculateChargeSingleton(amount: number, days = 1): number {
    return amount * days;
  }

  static CalculateChargeforAll(courses: string[] | string, days?: number): number {
    // console.log(this.CalculateChargeSingleton(charges[course]));
    let totalcharges = 0;
    if (typeof courses == 'string') {
      return CourseChargeSheet.CalculateChargeSingleton(charges[courses]);
    }


    for (let singleCourse of courses) {
      singleCourse = Course.stringToEnum(singleCourse);
      totalcharges += CourseChargeSheet.CalculateChargeSingleton(charges[singleCourse]);
      // console.log(charges[singleCourse],singleCourse);

    }

    return totalcharges;
  }
}
