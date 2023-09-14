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


  registeruser(user:User):Observable<User>{
    console.log("post hit")
    return this.http.post<User>(`${this.URL}`+"user/register",user);
  }

  loginUser(user:any){
    console.log("login hit")
    return this.http.post(`${this.URL}`+"user/login",user);
  }

  getAllPosts(token: string) {
    let options = {
      headers: { "Authorization": "Bearer " + token}
    }
    return this.http.get(`${this.URL}`+ "posts" , options)
  }

  constructor(private http: HttpClient) { }
}
