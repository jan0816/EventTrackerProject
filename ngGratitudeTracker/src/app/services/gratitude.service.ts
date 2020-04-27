import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gratitude } from '../model/gratitude';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GratitudeService {

private url = environment.baseUrl + 'api/gratitudes'

private gratitudes : Gratitude [] = [];

  constructor(
    private http: HttpClient
  ) { }

  public index() {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Gratitude[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GratitudeService.index: error retrieving gratitudes: ' + err);
      })
    );
  }
  public show(id) {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Gratitude>(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GratitudeService.show: error retrieving entry: ' + err);
      })
    );
  }
  public create(gratitude: Gratitude) {
   this.gratitudes.push(gratitude);
    const httpOptions = this.getHttpOptions();
    return this.http.post<Gratitude>(this.url, gratitude, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GratitudeService.create: error creating entry: ' + err);
      })
    );
  }

  public update(gratitude: Gratitude) {
    const httpOptions = this.getHttpOptions();
    return this.http
      .put<Gratitude>(`${this.url}/${gratitude.id}`, gratitude, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('GratitudeService.update: error updating todo: ' + err);
        })
      );
  }

  public destroy(id: number) {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GratitudeService.delete: error deleting entry: ' + err);
      })
    );
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({

        'Content-Type': 'application/json',
        'Athorization': 'my-auth-token'
      })
    };
    return httpOptions;
  }
}
