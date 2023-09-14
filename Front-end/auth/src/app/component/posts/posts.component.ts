import Swal from 'sweetalert2';
import { ServiceService } from './../../service/service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  token: string | null = ""
  loggedemail:string | null=""

  constructor(private configService: ServiceService) { }



  ngOnInit(): void {
    //get the token
    this.token = localStorage.getItem('token');
    this.loggedemail=localStorage.getItem('email');
    
    //retrive the offers (default category electronics)
    if (this.token != null) {
      this.configService.getAllPosts(this.token).subscribe({
        next: (res) => {
          console.log(res);

          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'Logged in sucessfully',
          //   showConfirmButton: false,
          //   timer: 1500
          // })
  
  
          //this.router.navigate(['/', 'homepage']);
  
        },
        error: (error) => {
          console.log(error.error);
          // let text =error.error
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: text.toUpperCase() ,
            
          // })
         
        },
        complete: () => console.info('User Registered'),
      });
    }
     
  }



}
