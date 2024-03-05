import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { OTP } from '../_models/OTP';

@Injectable({ providedIn: 'root' })
export class OTPSERVICE {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    
    generateOTP(): Observable<OTP> {
        return this.http.post<OTP>(`${environment.apiUrl}/OTP/GenerateOTp`, {});
    }
    verifyOTP(identification: string): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/OTP/VerifOTP/${identification}`, {}).pipe(
            map(response => {
                if (response) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
    getOTPbyId(){}
    resendOTP(existingOTP: OTP): Observable<OTP> {
        return this.http.post<OTP>(`${environment.apiUrl}/OTP/ResendOTP`, existingOTP);
    }
}

