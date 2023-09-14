import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: User = new User();
  constructor(private service: ServiceService, private router: Router) {}

  RegisterUser() {
    this.service.registeruser(this.user).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User saved',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/', 'login']);
      },
      error: (error) => {
        console.log(error);
        let text = error.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: text.toUpperCase(),
        });
      },
      complete: () => {
        console.info('complete');
      },
    });
  }

  onSubmit() {
    console.log(this.user);
    this.RegisterUser();
  }
}
