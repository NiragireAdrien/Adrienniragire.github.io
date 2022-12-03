import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}auth/login`, params);
  }

  signup(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}auth/register`, params);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}user/get-users`);
  }

  deleteUser(id): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}user/delete-user/${id}`);
  }

  getAppointmentsByUserId(userId): Observable<any> {
    return this.httpClient.get(`${this.apiURL}appointment/get-appointments-by-user-id/${userId}`);
  }

  scheduleAppointment(params): Observable<any> {
    return this.httpClient.post(`${this.apiURL}appointment/schedule-appointment`, params);
  }

  getAppointments(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}appointment/get-appointments`);
  }

  updateAppointmentStatus(params, appointmentId): Observable<any> {
    return this.httpClient.put(`${this.apiURL}appointment/update-appointment-status/${appointmentId}`, params);
  }
}
