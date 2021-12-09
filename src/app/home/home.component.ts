import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { City } from '../city.model';
import { CitylistService } from '../citylist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isLoggedin: boolean = false;
  loggedInUser: string = "";
  hasEditAccess: boolean = false;

  // pagination related
  pageNumber: number = 1;
  count: number = 0;
  pageSize: number = 3;
  pageSizes: Array<number> = [3, 6];
  cityList: Array<City> = [];
  currentSelectedCity?: City;
  currentIndex: number = -1;
  searchKeyword: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService, private cityListService: CitylistService) {


  }

  ngOnInit() {

    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedInUser = this.authService.getLoggedinUser();
    this.hasEditAccess = this.authService.hasEditAuthority();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.fetchAllCities();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  getRequestParams(searchKeyword: string, pageNumber: number, pageSize: number): any {

    let params: any = {};
    if (this.pageNumber) {
      params[`pageNumber`] = pageNumber - 1;
    }

    if (this.pageSize) {
      params[`pageSize`] = pageSize;
    }

    if (searchKeyword) {
      params[`name`] = searchKeyword;
    }

    return params;
  }

  fetchAllCities(): void {
    const params = this.getRequestParams(this.searchKeyword, this.pageNumber, this.pageSize);

    this.cityListService.fetchCities(params)
      .subscribe(
        response => {

          this.cityList = response.content;
          this.count = response.totalItems;
        },
        error => {
          console.log("Error occurred while fetching city list", error);
        });
  }

  searchCity() {
    console.log(this.searchKeyword);
    this.pageNumber = 1;
    this.fetchAllCities();
  }

  handlePageChange(event: number): void {

    this.pageNumber = event;
    this.fetchAllCities();
  }

  handlePageSizeChange(event: any): void {

    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.fetchAllCities();
  }

  setActiveCity(city: City, index: number): void {

    this.currentSelectedCity = city;
    this.currentIndex = index;
  }
}
