import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../environments/environment';
import {MailerModel} from '../Models/mailer-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  Url = API_URL + 'mail';

  constructor(private http: HttpClient) {
  }

  // For sending Email to the admin
  sendMail(mail: MailerModel): Observable<any> {
    return this.http.post<any>(this.Url, mail);
  }

}
