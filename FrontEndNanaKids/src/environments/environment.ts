// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
   firebaseConfig : {
    apiKey: "AIzaSyAtXVPKiFM1SE4c9eSUuCaZTj0lfl3jSxk",
    authDomain: "nanakids.firebaseapp.com",
    projectId: "nanakids",
    storageBucket: "nanakids.appspot.com",
    messagingSenderId: "58574132844",
    appId: "1:58574132844:web:def5b24d767cd32faaea49",
    measurementId: "G-W0C40SEPCN"
  },
  
  endpoint:'https://nanakidsbackends.herokuapp.com/',
  apiKid:'kid/',
  apiClient:'client/',
  apiFeli:'felicitation/',
  feliSearchByType:'felicitation/search/',
  feliSearchByTypeAndDate:'felicitation/search/date-type/',
  feliDaySearchByType:'felicitation/count/date-type/',
  feliCount:'felicitation/count/',
  feliSent:'felicitation/change-to-sent/',
  feliUnSent:'felicitation/change-to-unsent/',
  
};