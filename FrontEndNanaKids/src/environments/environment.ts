// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,  
 // Your web app's Firebase configuration
 firebaseConfig : {
  apiKey: "AIzaSyA8ReMge0Dq3bz-hPSzFf1Xwrrh4upW8OY",
  authDomain: "nanakids-3f532.firebaseapp.com",
  projectId: "nanakids-3f532",
  storageBucket: "nanakids-3f532.appspot.com",
  messagingSenderId: "189754207132",
  appId: "1:189754207132:web:2e91824524c91ae62a7659"
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
  sendMessage:'message',
  
};