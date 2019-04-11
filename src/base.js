import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAHkcCtmQeOkCjkmKlCOEa_iOhtnrncmQ0",
  authDomain: "catch-of-the-day-b636f.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-b636f.firebaseio.com",
});


const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;