import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseChargeSheet} from '../../../../Models/course-charge-sheet';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../../Models/courses';
import {WindowRefService} from '../../../../Services/window-ref.service';


@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private courseName: string;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private router: ActivatedRoute, private winref: WindowRefService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactNumber: ['', Validators.required],
      registeredFor: ['', Validators.required],
      amountPaid: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.router.paramMap.subscribe(params => {
      // console.log(params.get('course'));
      this.courseName = params.get('course');
    });
  }

  setPrice(): number {
    const courseId = Course.stringToEnum(this.courseName);
    //console.log(CourseChargeSheet.CalculateChargeforAll(courseId));
    return CourseChargeSheet.CalculateChargeforAll(courseId);


  }

  rzp1: any;

  openCheckout(): void {

    const options = {
      key: 'rzp_test_a0yDNvv3dMMij8',
      amount: '10000',
      currency: 'INR',
      name: 'sidd',
      description: 'A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami',
      image: 'https://example.com/your_logo',
      order_id: 'order_CuJ54NTI5sYaI0',
      handler(response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com'
      },
      notes: {
        address: 'note value'
      },
      theme: {
        color: '#F37254'
      }
    };
    this.rzp1 = WindowRefService.nativeWindow.Razorpay(options);
    console.log(this.rzp1, WindowRefService.nativeWindow.Razorpay(options));
    this.rzp1.open();

    // const rzp1 = new Razorpay(options);
    // rzp1.open();
  }
}
