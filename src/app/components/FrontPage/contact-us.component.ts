import {Component, OnInit} from '@angular/core';
import {MailService} from '../../../Services/mail.service';
import {MailerModel} from '../../../Models/mailer-model';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Courses} from '../../../Models/courses.enum';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private mail: MailService, private fB: FormBuilder) {
  }

  formControl: FormGroup;
  course = Courses;
  keys = Object.keys(this.course);

  ngOnInit() {
    this.formControl = this.fB.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phNum: ['', [Validators.required, this.customValidation()]],
      course: ['', Validators.required],
      college: ['', Validators.required],
      semester: ['', Validators.required],
      queries: [''],
    });
  }

  get form() {
    return this.formControl.value;
  }

  sendMail(): void {
    console.log(this.form);
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
    console.log(email);


    // sending mail here
    this.mail.sendMail(email).subscribe(data => {
      console.log('success', data);
    }, err => {
      console.error(err);
    });
  }

  get phoneNumber() {
    if(this.formControl.get('phNumber') != null ) {
      return this.formControl.get('phNumber').value;
    }
  }

  customValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.phNum !== undefined) {
        if (control.value.phNum.length === 10) {
          console.log(' Valid');
          return {phoneNumber: true};
        } else {
          console.log('Not Valid');
          return {phoneNumber: false};
        }
      } else {
        console.log('Not Valid');
        return {phoneNumber: false};
      }
    };
  }

}
