import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  isLoggedIn: boolean = false;
  error: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedin();

    if (this.isLoggedIn) {
      this.router.navigateByUrl("");
    }
  }

  login() {
    if (this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
      this.authService.authenticate(this.username, this.password).subscribe((result) => {
        console.log(result);
        this.router.navigate(['/home']);
      }, () => {
        this.error = 'Either invalid credentials or something went wrong';
      });
    } else {
      this.error = 'Invalid Credentials';
    }
  }
}
