import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {Course, CourseChargeSheet} from '../../../../Models/courses';
import {WindowRefService} from '../../../../Services/window-ref.service';
import {CreateOrder} from '../../../../Models/razorpay';
import {EnrollStudentService} from '../../../../Services/enrollStudent.service';
import {charges, CovenienceCharges, MoneyConversion, paymentMethods} from '../../../../Models/charges';
import {environment} from '../../../../environments/environment';
import {EnrolledStudent} from '../../../../Models/EnrolledStudent';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder, private router: ActivatedRoute, private winref: WindowRefService,
              private razorPay: EnrollStudentService) {


  }


  get firstForm() {
    return this.firstFormGroup.value;
  }

  amountSummingConenienceFees = 0;
  convenienceCharges = 0;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  paymentMethodsFormGroup: FormGroup;
  private courseName: string;

  rzp1: any;
  private callBackUrl = `http:/localhost:4200/enrollstudent/${this.courseName}/`;
  paymentModeCheckbox: FormControl;

  ngOnInit() {

    // console.log(CovenienceCharges.findPercentage('card', ['national', 'dinersCard']));

    this.router.paramMap.subscribe(params => {
      // console.log(params.get('course'));
      this.courseName = params.get('course');

    });


    this.firstFormGroup = this._formBuilder.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactNumber: ['', Validators.required],

      registeredFor: [this.courseName, Validators.required],
      amountPaid: [this.setPrice(), Validators.required]


    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.paymentModeCheckbox = new FormControl();


    this.paymentMethodsFormGroup = this._formBuilder.group({
      courseSelected: this.courseName,
      amountToBePaid: this.setPrice(),

    });

    this.amountSummingConenienceFees = this.setPrice();
  }

  setPrice(): number {
    const courseId = Course.stringToEnum(this.courseName);
    return CourseChargeSheet.CalculateChargeforAll(courseId);


  }

  openCheckout(): void {
    if (this.paymentModeCheckbox.value == null || this.paymentMethodsFormGroup.value == undefined) {

    }
    const order = new CreateOrder();
    order.amount = MoneyConversion.inPaisa(this.total());
    order.notes = {
      enrollThisStudent: this.firstForm.firstName + this.firstForm.lastName, emailId: this.firstForm.contactEmail,
      phoneNumber: this.firstForm.contactNumber
    };
    order.receipt = 'receipt' + this.firstForm.email;

    Swal.fire({
      title: 'Ensuring your money reach us safely....',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    this.razorPay.createOrder(order).subscribe(res => {
      console.log(res);

      const options = {
        key: environment['razor-key-id'],
        amount: MoneyConversion.inPaisa(res.amount),
        currency: environment.currency,
        name: this.firstForm.firstName,
        description: 'A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami',
        image: environment['company-logo'],
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
        method: 'upi',
        callback_url: this.callBackUrl
      };
      Swal.fire({
        title: 'Redirecting to Checkout page....',
        timer: 500,
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
          Swal.showLoading();
        }
      });
      this.razorInstance(options);
    }, error1 => console.error(error1));


  }

  razorInstance(options) {

    this.rzp1 = WindowRefService.nativeWindow.Razorpay(options);
    this.rzp1.open();
  }

  getOrderId(): void {
    return;
  }

  private enrollStudent(response: any) {
    console.log(response);
    const enrollThisStudent = new EnrolledStudent();
    enrollThisStudent.amountPaid = this.setPrice();
    enrollThisStudent.contactEmail = this.firstForm.contactEmail;
    enrollThisStudent.contactNumber = this.firstForm.contactNumber;
    enrollThisStudent.firstName = this.firstForm.firstName;
    enrollThisStudent.lastName = this.firstForm.lastName;
    enrollThisStudent.registeredFor = this.firstForm.registeredFor;
    enrollThisStudent.paymentId = response.razorpay_payment_id;
    enrollThisStudent.orderId = response.razorpay_order_id;

    this.razorPay.enrollTheStudent(enrollThisStudent).subscribe(data => {
        console.log(data);
        Swal.fire({
          title: 'We got your money, now lets start Learning!!',
          type: 'success',
          timer: 3000,
          showConfirmButton: false
        });
      }, error1 =>
        console.error(error1)
    );
  }

  decline() {
    console.log(this.paymentModeCheckbox.value);
    this.calculateConvenienceCharges();
  }

  calculateConvenienceCharges() {
    this.amountSummingConenienceFees = this.total();
    this.convenienceCharges = CovenienceCharges.convenienceCharges(this.setPrice(), this.paymentModeCheckbox.value);

  }

  total(): number {
    return CovenienceCharges.summingConvenienceCharges(this.setPrice(), this.paymentModeCheckbox.value);
  }

  knowThePaymentMode(node: any) {
    console.log(CovenienceCharges.findPercentage('card', ['national', 'dinersCard']));
    console.log(this.paymentModeCheckbox.value);
  }
}
