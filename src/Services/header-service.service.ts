import {Injectable} from '@angular/core';
import {Observable, pipe, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {
  public toShowHeader = new Subject();


  constructor() {
    this.headerForBody();
    this.putTrue();
  }


  // locations = new Observable((observer) => {
  //   // Get the next and error callbacks. These will be passed in when
  //   // the consumer subscribes.
  //   const {next, error} = observer;
  //   let watchId;
  //
  //   // Simple geolocation API check provides values to publish
  //   if ('geolocation' in navigator) {
  //     watchId = navigator.geolocation.watchPosition(next, error);
  //   } else {
  //     error('Geolocation not available');
  //   }
  //
  //   // When the consumer unsubscribes, clean up data ready for next subscription.
  //   return {
  //     unsubscribe() {
  //       navigator.geolocation.clearWatch(watchId);
  //     }
  //   };
  // });
  // public toShowHeader = new Observable<boolean>((observer) => {
  //   const {next, error} = observer;
  // });


  putTrue() {
    this.toShowHeader.next(true);
  }

  get header() {
    this.toShowHeader.subscribe(data => {
      pipe(() => {
        console.log(data);
      });
    });
    return this.toShowHeader;
  }

  headerForBody() {

    this.toShowHeader.next(false);
  }
}
