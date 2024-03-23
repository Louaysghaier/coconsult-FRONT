import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    isconn: any=false;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signIn`, { email, password })
            .pipe(map(user => {
                // const token = response.accessToken; 
                //        if (rememberMe) {
                // localStorage.setItem('access_token', token);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               // sessionStorage.setItem('userid',user);
                console.info(user);
                this.userSubject.next(user);
                this.isconn=true;

                return user;
            }));
    }
    getIsConnected() {
        return this.userValue != null ;
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        // Alternatively, you can use localStorage:
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User, roleName: string) {
        return this.http.post(`${environment.apiUrl}/api/auth/signup/employee/${roleName}`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    getCurrentUser(): Observable<User | null> {
        return this.user;
    }
    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id.toString() === this.userValue?.id?.toString()) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id.toString() === this.userValue?.id?.toString()) {
                    this.logout();
                }
                return x;
            }));
    }
    getAuthToken(): string {
        const token = localStorage.getItem('access_token');
        console.log('SERVICE token is' + token)

        return token || 'EMPTY';
    }
    forgetPassword(username: String, resetPass: any) {
        return this.http.put(`${environment.apiUrl}/api/user/forgetpass/${username}`, resetPass);
    }
    userForgetPassword(email: String) {
        return this.http.post(`${environment.apiUrl}/api/user/forgetpassword/${email}`, null);
    }
    forgetPasswordbyemail(email: String, resetPass: any) {
        return this.http.put(`${environment.apiUrl}/api/user/forgetpassbyemail/${email}`, resetPass);
    }
    getAccessToken(): string {
        return localStorage.getItem('accessToken');
      }
    getrefresgtoken():string{
        return localStorage.getItem('refreshToken');}

      refreshToken(): Observable<any> {
        // Implement logic to call the token refresh API
        return this.http.post<any>('/api/auth/refreshToken', { refreshToken: localStorage.getItem('refreshToken') });
      }
}