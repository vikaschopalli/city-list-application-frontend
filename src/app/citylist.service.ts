import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { City } from './city.model';

@Injectable({
  providedIn: 'root'
})
export class CitylistService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchCities(params: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/city`, { params });
  }

  findCityByName(name: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/city?name=${name}`);
  }

  findCityById(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/api/city/${id}`);
  }

  updateCity(id: any, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/api/city/${id}`, data, { responseType: 'text' });
  }
}
