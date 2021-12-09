import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { City } from '../city.model';
import { CitylistService } from '../citylist.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  currentSelectedCity: City = {
    id: 0,
    name: '',
    photo: ''
  };
  message = '';
  failureMessage = '';


  isLoggedin: boolean = false;
  loggedInUser: string = "";
  hasEditAccess: boolean = false;

  constructor(private cityListService: CitylistService,
    private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedInUser = this.authService.getLoggedinUser();
    this.hasEditAccess = this.authService.hasEditAuthority();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

    if (!this.hasEditAccess) {
      this.authService.logout();
      this.router.navigateByUrl('login');
    }

    this.message = '';
    this.getCity(this.route.snapshot.params['id']);
  }

  getCity(id: string): void {
    this.cityListService.findCityById(id)
      .subscribe(
        data => {
          this.currentSelectedCity = data;
          console.log(data);
        },
        error => {
          console.log(error);
          this.authService.logout();
          this.router.navigateByUrl('login');
        });
  }

  updateCity(): void {
    this.cityListService.updateCity(this.currentSelectedCity.id, this.currentSelectedCity)
      .subscribe(
        response => {
          console.log(response);
          console.log(JSON.stringify(response));
          this.message = "City updated successfully !"

        },
        error => {
          console.log("Error while updating city", error);
          this.failureMessage = "logged in user does not have necessary role to perform this operation!"
        });
  }

  redirectToList() {
    this.router.navigateByUrl('home');
  }

}
