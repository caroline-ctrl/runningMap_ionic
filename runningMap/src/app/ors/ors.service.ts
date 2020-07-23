import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': '5b3ce3597851110001cf6248e4f4182f661b4d95829edd912435b2f4'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrsService {
  private URL_API_ORS = 'https://api.openrouteservice.org';
  private API_KEY = '5b3ce3597851110001cf6248e4f4182f661b4d95829edd912435b2f4';

  constructor(private http: HttpClient) {}

  // getStartingPoint(data) {
  //   return this.http.get(this.URL_API_ORS + '/geocode/search?api_key=' + this.API_KEY + '&text=' + data);
  // }

  getEndPoint(data) {
    return this.http.get(this.URL_API_ORS + '/geocode/search?api_key=' + this.API_KEY + '&text=' + data);
  }

  direction(locomotion, start, end) {
    return this.http.get(this.URL_API_ORS + '/v2/directions/' + locomotion + '?api_key=' + this.API_KEY + '&start=' + start + '&end=' + end);
  }

  matrix(locomotion, data) {
    return this.http.post(this.URL_API_ORS + '/v2/matrix/' + locomotion, data,  httpOptions);
  }

  // geolocationPointA(dataLong, dataLat){
  //   return this.http.get(this.URL_API_ORS + '/geocode/reverse?api_key=' + this.API_KEY + '&point.lon=' + dataLong + '&point.lat=' + dataLat);
  // }
}
