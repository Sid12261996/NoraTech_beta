import {Courses} from './courses.enum';
import {charges} from './charges';

export class CourseChargeSheet {
  static CalculateChargeSingleton(amount: number, days = 1): number {
    return amount * days;
  }

  static CalculateChargeforAll(courses: string[], days?: number): number {
    // console.log(this.CalculateChargeSingleton(charges[course]));
    let totalcharges = 0;
    courses.forEach(singleCourse => {
      totalcharges += this.CalculateChargeSingleton(charges[singleCourse]);
     // console.log(charges[singleCourse],singleCourse);
    });

    return totalcharges;
  }
}
