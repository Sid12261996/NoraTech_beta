import {Course} from './courses';
import {charges} from './charges';

export class CourseChargeSheet {
  private static CalculateChargeSingleton(amount: number, days = 1): number {
    return amount * days;
  }

  static CalculateChargeforAll(courses: string[] | string, days?: number): number {
    // console.log(this.CalculateChargeSingleton(charges[course]));
    let totalcharges = 0;
   if (typeof courses == 'string') {
      totalcharges = CourseChargeSheet.CalculateChargeSingleton(charges[courses]);
      return totalcharges;
    }


    for (let singleCourse of courses) {
      singleCourse = Course.stringToEnum(singleCourse);
      totalcharges += CourseChargeSheet.CalculateChargeSingleton(charges[singleCourse]);
      // console.log(charges[singleCourse],singleCourse);

    }

    return totalcharges;
  }
}
