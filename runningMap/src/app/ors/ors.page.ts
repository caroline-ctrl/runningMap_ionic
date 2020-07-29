import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrsService } from './ors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [ 25, 41 ],
  iconAnchor: [ 12, 41 ],
  popupAnchor: [ 1, -34 ],
  tooltipAnchor: [ 16, -28 ],
  shadowSize: [ 41, 41 ]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-ors',
  templateUrl: './ors.page.html',
  styleUrls: [ './ors.page.scss' ]
})
export class OrsPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  itineraire: FormGroup;
  locationCoords: any;
  // valeur coordonnées gps start
  longitudeStart;
  latitudeStart;
  // valeur coordonnées gps end
  longitudeEnd;
  latitudeEnd;
  // convertion en string
  pointsstartLon;
  pointsstartLat;
  pointsEndLong;
  pointsEndLat;
  // coordonnées string depart
  start;
  end;
  // map
  mymap;
  mymapItineraire;
  // tableau coordonnées
  latlngs;
  // choix du sport
  choice;
  tablePoints;
  // temps entre le point A et le point B
  duration;

  constructor(
    private orsService: OrsService,
    private formBuilder: FormBuilder,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy
  ) {}

  ngOnInit() {
    this.itineraire = this.formBuilder.group({
      endPoint: [ '', Validators.required ],
      choiceValue: [ '', Validators.required ]
    });

    this.mymap = L.map('map').setView([ 43.6112422, 3.8767337 ], 15);

    L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(this.mymap);
  }


    // Verifie si permission acces GPS 
    checkGPSPermission() {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => {
          if (result.hasPermission) {
            this.askToTurnOnGPS();
          } else {
            this.requestGPSPermission();
          }
        },
        err => {
          alert(err);
        }
      );
    }
  
    // Obtenir l'autorisation de localisation de l'utilisateur
    requestGPSPermission() {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            console.log('success'),
            err => console.log(err)
          });
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
            .then(
              () => {
                this.askToTurnOnGPS();
              },
              error => {
                alert('requestPermission Error requesting location permissions ' + error)
              }
            );
        }
      });
    }
  
  
    // si on a l'autorisation d'accés à la localisation : ouvre la boite de dialogue
    askToTurnOnGPS() {
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          this.getLocationCoordinates();
        },
        error => alert('Error requesting location permissions ' + JSON.stringify(error))
      );
    }
  
  
  // recupère les point long et lat du départ number
  // retour un string
  getLocationCoordinates() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitudeStart = resp.coords.latitude;
        this.longitudeStart = resp.coords.longitude;

        this.pointsstartLon = this.longitudeStart + '';
        this.pointsstartLat = this.latitudeStart + '';

        this.start = this.pointsstartLon + ',' + this.pointsstartLat;
        
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        console.log(data.coords.latitude);
        console.log(data.coords.longitude);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // choix du sport
  getChoiceValue() {
    const formValue = this.itineraire.value;
    this.choice = formValue.choiceValue;
    return this.choice;
  }

  // recupère les coordonnées GPS du point B
  getEndPoint() {
    const formValue = this.itineraire.value;
    const dataEnd = formValue.endPoint;

    this.orsService.getEndPoint(dataEnd).subscribe(
      (resultEnd) => {
        const coordinates =
          resultEnd['features']['0']['geometry']['coordinates'];
        this.longitudeEnd = coordinates['0'];
        this.latitudeEnd = coordinates['1'];
        this.pointsEndLong = this.longitudeEnd + '';
        this.pointsEndLat = this.latitudeEnd + '';
        this.end = this.pointsEndLong + ',' + this.pointsEndLat;

        this.direction(this.getChoiceValue(), this.start, this.end);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // récup les points du point A au point B dans un tableau
  // return array
  pointsArray(items) {
    let pointsArray = [];
    items.forEach((item) => {
      pointsArray.push(new L.LatLng(item[1], item[0]));
    });
    return pointsArray;
  }

  // modifie l'orde dans le tableau
  // return array
  pointsLatLong(items) {
    let pointsArray = [];
    items.forEach((item) => {
      pointsArray.push(item[0], item[1]);
    });
    return pointsArray;
  }

  // permet de réaliser le tracé de l'itineraire
  // modifie la map
  // realise un tracé
  direction(locomotion, start, end) {
    this.orsService.direction(locomotion, start, end).subscribe(
      (result) => {
        if (this.mymap) {
          // si la carte est deja utilisé
          this.mymap.eachLayer((layer) => {
            layer.remove();
          });
          this.mymap.remove();
          this.mymap = null;
          // si la carte est deja utilisé

          this.mymapItineraire = L.map('map').setView(
            [ this.latitudeStart, this.longitudeStart ],
            18
          );

          L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
          }).addTo(this.mymapItineraire);
        }

        this.tablePoints = [];
        this.tablePoints = result['features']['0']['geometry']['coordinates'];

        const polyline = L.polyline(this.pointsArray(this.tablePoints), {
          color: 'red'
        }).addTo(this.mymapItineraire);
        this.mymapItineraire.fitBounds(polyline.getBounds());

        L.marker([ this.latitudeStart, this.longitudeStart ]).addTo(
          this.mymapItineraire
        );
        L.marker([ this.latitudeEnd, this.longitudeEnd ]).addTo(
          this.mymapItineraire
        );

        this.matrix(this.getChoiceValue(), this.tablePoints);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // temps et distance entre le point A et le point B
  matrix(locomotion, points) {
    let locationData = {
      locations: points,
      metrics: [ 'distance', 'duration' ]
    };
    this.orsService.matrix(locomotion, locationData).subscribe(
      (result) => {
        console.log(result);
        const totalDuration = result['durations']['0'];
        const minute = totalDuration[totalDuration.length - 1] / 60;
        this.duration = minute.toFixed(2);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
