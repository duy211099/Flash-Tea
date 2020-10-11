import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;
  messageAuthentication: string;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signInWithEmailAndPassword(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmailAndPassword(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationEmail() {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  // forgot password?
  passwordRecoverWithLink(passwordResetEmail) {
    return firebase.auth().sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.messageAuthentication = 'Password reset email has been sent, please check your inbox! ^^';
      }).catch((error) => {
        this.messageAuthentication = error;
      });
  }

  // return true when user if logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // return true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // sign in with google
  signInWithGoogle() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // sign in with facebook
  signInWithFacebook() {
    return this.authLogin(new firebase.auth.FacebookAuthProvider());
  }

  // sign in with github
  signInWighGithub() {
    return this.authLogin(new firebase.auth.GithubAuthProvider());
  }

  // authLogin provider
  authLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
          this.messageAuthentication = 'Welcome to Flash Tea! ^^';
        });
        this.setUserData(result.user);
      }).catch(error => {
        this.messageAuthentication = error;
      });
  }

  // store user in localStorage
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  getDataFromCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      } else {
        console.log(user);
      }
    });
  }

  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.messageAuthentication = 'Log out successfull! ^^';
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}