import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateOrder} from '../Models/razorpay';
import {Observable} from 'rxjs';
import {API_URL} from '../environments/environment';
import {EnrolledStudent} from '../Models/EnrolledStudent';


@Injectable({
  providedIn: 'root'
})
export class EnrollStudentService {

  constructor(private http: HttpClient) {
  }

  url = API_URL;

  createOrder(order: CreateOrder): Observable<any> {
    return this.http.post(this.url + 'payment/order/create', order);
  }

  enrollTheStudent(enrolledStudent: EnrolledStudent): Observable<any> {
    return this.http.post(this.url + 'enroll', enrolledStudent);

  }

  createTransaction(tranaction): Observable<any> {
    return this.http.post(`${this.url}/payment/transaction/create`, tranaction);
  }
}
