// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:8080/',
  apiURL: 'http://localhost:8080/api',
  clientId: 'salp-app',
  clientSecret: '@9012',//$2a$10$FKh6Bq9ExfML4J6LH1c6aOZU99qBlAwno83nJXKiiHnpsasjq6x1a',
  tokenURL: 'http://localhost:8080/oauth/token'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
