import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from 'src/app/model/authResponse';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    // if(localStorage.getItem("token")){
    //   this.router.navigate(['/homepage'])
    // }
  }

  LoginUser() {
    this.service.loginUser(this.user).subscribe({
      next: (res) => {
        console.log(res);

        const token = JSON.stringify(res);

        console.log(token);
        console.log(this.user.email);

        localStorage.setItem('email', this.user.email!);
      //  localStorage.setItem('name', this.user.name!);
        localStorage.setItem('token', token);
        localStorage.setItem('loggedin', 'true');

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged in sucessfully',
          showConfirmButton: false,
          timer: 1500
        })


        this.router.navigate(['/', 'homepage']);

      },
      error: (error) => {
        console.log(error.error);
        let text =error.error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: text.toUpperCase() ,
          
        })
       
      },
      complete: () => console.info('User Registered'),
    });
  }

  onSubmit() {
    console.log(this.user);
    this.LoginUser();
  }
}
