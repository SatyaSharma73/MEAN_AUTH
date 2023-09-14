import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  local:any

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.local = localStorage
  }

  logout(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to access this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged Out!',
          'Come back again',
          'success'
        )
        localStorage.clear()
        localStorage.removeItem('token')
        localStorage.removeItem('loggedin')
        location.reload()
        this.route.navigate(['/login']);
      }
    })

   
  }
}
