import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {Course, CourseChargeSheet} from '../../../../Models/courses';
import {WindowRefService} from '../../../../Services/window-ref.service';
import {CreateOrder} from '../../../../Models/razorpay';
import {EnrollStudentService} from '../../../../Services/enrollStudent.service';
import {MoneyConversion} from '../../../../Models/charges';
import {EnrolledStudent} from '../../../../Models/EnrolledStudent';


@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})


export class EnrollStudentComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private router: ActivatedRoute, private winref: WindowRefService,
              private razorPay: EnrollStudentService) {
  }

  get firstForm() {
    return this.firstFormGroup.value;
  }

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private courseName: string;

  rzp1: any;

  order: CreateOrder;
  private callBackUrl = `http:/localhost:4200/enrollstudent/${this.courseName}/`;

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
    return CourseChargeSheet.CalculateChargeforAll(courseId);


  }

  openCheckout(): void {
    this.rzp1.open();
  }

  razorInstance(options) {

    this.rzp1 = WindowRefService.nativeWindow.Razorpay(options);
  }

  getOrderId(): void {
    const order = new CreateOrder();
    order.amount = MoneyConversion.inPaisa(this.setPrice());
    order.notes = {
      enrolledStudent: this.firstForm.firstName + this.firstForm.lastName, emailId: this.firstForm.contactEmail,
      phoneNumber: this.firstForm.contactNumber
    };
    order.receipt = 'receipt' + this.firstForm.email;


    this.razorPay.createOrder(order).subscribe(res => {
      console.log(res);
      const options = {
        key: 'rzp_test_a0yDNvv3dMMij8',
        amount: MoneyConversion.inPaisa(res.amount),
        currency: 'INR',
        name: this.firstForm.firstName,
        description: 'A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami',
        image: 'assets/logo.png',
        order_id: res.id,
        handler: (response) => {
          console.log(response);
          this.enrollStudent(response);
        },
        prefill: {
          name: this.firstForm.firstName,
          email: this.firstForm.contactEmail
        },
        notes: {
          address: 'note value'
        },
        theme: {
          color: '#F37254'
        },
        callback_url: this.callBackUrl
      };
      this.razorInstance(options);
    }, error1 => console.error(error1));
  }

  private enrollStudent(response: any) {
    console.log(response);
    const enrolledStudent = new EnrolledStudent();
    enrolledStudent.amountPaid = this.setPrice();
    enrolledStudent.contactEmail = this.firstForm.contactEmail;
    enrolledStudent.contactNumber = this.firstForm.contactNumber;
    enrolledStudent.firstName = this.firstForm.firstName;
    enrolledStudent.lastName = this.firstForm.lastName;
    enrolledStudent.registeredFor = this.firstForm.registeredFor;
    enrolledStudent.paymentId = response.razorpay_payment_id;
    enrolledStudent.orderId = response.razorpay_order_id;

    this.razorPay.enrollTheStudent(enrolledStudent).subscribe(data => {
        console.log(data);
      }, error1 =>
        console.error(error1)
    );
  }

  private createTransaction(paymentId,orderId,enrolledStudentId,){

  }
}
