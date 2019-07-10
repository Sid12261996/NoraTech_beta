import {Component, OnInit} from '@angular/core';
import {MailService} from '../../../Services/mail.service';
import {MailerModel} from '../../../Models/mailer-model';
import {AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators} from '@angular/forms';
import {Course, Courses} from '../../../Models/courses.enum';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {CourseChargeSheet} from '../../../Models/course-charge-sheet';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private mail: MailService, private fB: FormBuilder, private loc: Location) {
  }

  formControl: FormGroup;
  course = Courses;
  keys = Object.keys(this.course);

  ngOnInit() {

    // @ts-ignore
    this.formControl = this.fB.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phNum: ['', [Validators.required, mobileNumberValidation]],
      course: ['', Validators.required],
      college: ['', Validators.required],
      semester: ['', Validators.required],
      queries: [''],
      price: [0]
    });
  }

  get form() {
    if (this.formControl !== undefined && this.formControl !== null) {
      return this.formControl.value;
    }
  }

  // get Errors() {
  //
  //   return this.formControl.getError();
  // }

  sendMail(): void {
    // console.log(this.form);
    const email = new MailerModel();
    email.subject = `Registration for ${this.form.course}`;
    email.body = `
    Name: ${this.form.name}
      Email: ${this.form.email}
      Contact No.:${this.form.phNum}
      College : ${this.form.college}
      Queries : ${this.form.queries}
      Semester : ${this.form.semester}
      Course Opting: ${this.form.course}
    `;

    // sending mail here
    this.mail.sendMail(email).subscribe(data => {
      console.log('success', data);
      if (data) {
        this.loc.back();
        Swal.fire({
          title: `Hey  ${this.form.name} !`,
          text:
            `We got your message.
            We will get back to you shortly.`,
          type: 'success',
          confirmButtonText: 'Got it'
        });
      }
    }, err => {
      console.error(err);
      Swal.fire({
        title: 'Oops!',
        text:
          `Hey !! ${this.form.name},
            Check your connection status and try again!!`,
        type: 'error',
        confirmButtonText: 'Got it'
      });
    });
  }

  get phoneNumber() {
    if (this.formControl.get('phNumber') != null) {
      return this.formControl.get('phNumber').value;
    }
  }

  //
  // mobileNumberValidation(): ValidatorFn {
  //   return;
  // }

  setPrice(): void {
    const temp = [];
    for (const justTemp of this.form.course) {
      temp.push(Course.stringToEnum(justTemp));
    }
    this.formControl.patchValue({
      price: CourseChargeSheet.CalculateChargeforAll(temp)
    });
  }
}

export function mobileNumberValidation(control: AbstractControl) {
  console.log('phNum', control);
  if (control.value !== null) {
    if (control.value.toString().length === 10) {
     // console.log(' Valid', control.get('phNum'));
      return null;
    } else {
     // console.log('Not Valid');
      return {phoneNumber: true};
    }
  } else {
   // console.log('Not Valid');
    return {phoneNumber: true};
  }

}
