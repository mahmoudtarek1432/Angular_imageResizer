import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals{
    baseUrl: string = "https://localhost:7142/" //"https://atharwat.com/"
    highlightedColor: string|undefined; // a hex color denoting the color of the selected image
}