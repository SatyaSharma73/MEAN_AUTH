import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../model/user'
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/authResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  URL="http://localhost:5000/api/"



  // getUserToken(user: User) {
  //   return this.http.post<authResponse>(`${this.URL}`+"user/login",user);
  // }


  registeruser(user:User):Observable<User>{
    console.log("post hit")
    return this.http.post<User>(`${this.URL}`+"user/register",user);
  }

  loginUser(user:any){
    console.log("login hit")
    return this.http.post(`${this.URL}`+"user/login",user);
  }


  constructor(private http: HttpClient) { }
}
