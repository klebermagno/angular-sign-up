import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, provider));
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // updateProfile(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.auth.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
