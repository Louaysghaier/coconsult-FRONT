import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { GroupChatservice } from './GroupChat.service';
import { GroupChat } from '../_models/GroupChat';


@Injectable({ providedIn: 'root' })
export class AccountService {
    public userSubject: BehaviorSubject<User | null>;
    public  CurrentUserInfo:Observable<User | null>;
    public CurrentUserInfoSubject:BehaviorSubject<User | null>;
    public CurrentgroupchatSubject:BehaviorSubject<GroupChat|null>;
    public CurrentGroupChat:Observable<GroupChat|null>;
    public user: Observable<User | null>;
    isconn: any=false;

    constructor(
        private router: Router,
        private http: HttpClient,
        private GroupChatservice: GroupChatservice
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
        this.CurrentUserInfoSubject=new BehaviorSubject(JSON.parse(localStorage.getItem('myuserinfo') || sessionStorage.getItem('myuserinfo')!));
        this.CurrentUserInfo = this.CurrentUserInfoSubject.asObservable();
        this.CurrentgroupchatSubject=new BehaviorSubject<GroupChat | null>(JSON.parse(localStorage.getItem('currentGroupChat') || 'null'));
        this.CurrentGroupChat=this.CurrentgroupchatSubject.asObservable();
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
                this.getuserById(user.id).subscribe((data: User) => {
                    localStorage.setItem('myuserinfo', JSON.stringify(data));
                    this.CurrentUserInfoSubject.next(data);
                    
                });
                this.GroupChatservice.getGroupChatByUser(user.id).subscribe((data: GroupChat) => {
                    localStorage.setItem('currentGroupChat', JSON.stringify(data));
                    this.CurrentgroupchatSubject.next(data);
                });
                
                return user;
            }));
    }
    public get userValue() {
        return this.userSubject.value;
    }
    //est3mlouha bach tgetiw user info koll
    public getCurrentUserInfoValue() {
        return this.CurrentUserInfoSubject.value;
    }//emchiw li servicetkom w asn3ou pbjet currentuser:user; mb3d fi constructor a3mlou 
    //this.currentuser=this.accountservice.getCurrentUserInfoValue() as User;
    //e5dmou byh tw yjikom info kol 3lé user
    public getCurrentGroupChatValue() {
        return this.CurrentgroupchatSubject.value;
    }
    getIsConnected() {
        return this.userValue != null ;
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('myuserinfo');
        localStorage.removeItem('email');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

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

    getuserById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/api/user/getuserbyid/${id}`);
    }
    getCurrentUser(): Observable<User | null> {
        return this.user;
    }
   /* update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id.toString() === this.userValue?.iduser?.toString()) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }*/

  /*  delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id.toString() === this.userValue?.iduser?.toString()) {
                    this.logout();
                }
                return x;
            }));
    }*/
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
        return localStorage.getItem('accessToken')||sessionStorage.getItem('accessToken')!;
      }
    getrefresgtoken():string{
        return localStorage.getItem('refreshToken')||sessionStorage.getItem('refreshToken')!;}

      refreshToken(): Observable<any> {
        // Implement logic to call the token refresh API
        return this.http.post<any>(`${environment.apiUrl}/api/auth/refreshToken`, { refreshToken: localStorage.getItem('refreshToken') });
      }
}