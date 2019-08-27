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

// export class TodoItemNode {
//   children: TodoItemNode[];
//   item: string;
//   display: string;
//   percentage: number;
// }
//
// /** Flat to-do item node with expandable and level information */
// export class TodoItemFlatNode {
//   item: string;
//   level: number;
//   expandable: boolean;
// }

// export const PAYMENT_SOURCE = {
//   card: {national: 2, international: {dinersCard: 3, amexCard: 3}},
//   netbanking: {national: 2, international: 3},
//   wallet: 2,
//   emi: 3,
//   upi: 2
// };

// @Injectable()
// export class ChecklistDatabase {
//   dataChange = new BehaviorSubject<TodoItemNode[]>([]);
//
//   get data(): TodoItemNode[] {
//     return this.dataChange.value;
//   }
//
//   constructor() {
//     this.initialize();
//   }
//
//   initialize() {
//     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
//     //     file node as children.
//     const data = this.buildFileTree(PAYMENT_SOURCE, 0);
//
//     // Notify the change.
//     this.dataChange.next(data);
//   }
//
//   /**
//    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
//    * The return value is the list of `TodoItemNode`.
//    */
//   buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
//     return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
//       const value = obj[key];
//       const node = new TodoItemNode();
//       node.item = key;
//       node.display = key;
//       node.percentage = obj[key];
//
//       if (value != null) {
//         if (typeof value === 'object') {
//           node.children = this.buildFileTree(value, level + 1);
//         } else {
//           node.item = value;
//           node.display = value;
//           node.percentage = obj[value];
//         }
//       }
//
//       return accumulator.concat(node);
//     }, []);
//   }
//
//   /** Add an item to to-do list */
//   insertItem(parent: TodoItemNode, name: string) {
//     if (parent.children) {
//       parent.children.push({item: name} as TodoItemNode);
//       this.dataChange.next(this.data);
//     }
//   }
//
//   updateItem(node: TodoItemNode, name: string) {
//     node.item = name;
//     this.dataChange.next(this.data);
//   }
// }

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
  allPaymentOptions = paymentMethods;
  order: CreateOrder;
  private callBackUrl = `http:/localhost:4200/enrollstudent/${this.courseName}/`;
  paymentModeCheckbox: FormControl;
  modeSelected = false;


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


    this.razorPay.createOrder(order).subscribe(res => {
      console.log(res);
      Swal.showLoading();
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
