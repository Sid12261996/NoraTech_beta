// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const API_URL = 'https://noraapi.herokuapp.com/';
export const environment = {
  production: false,
  'razor-key-id': 'rzp_test_a0yDNvv3dMMij8',
  currency: 'INR',
  'company-logo': `${API_URL}logo`
};

// export const API_URL = 'http://localhost:3000/';
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
