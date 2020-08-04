/// <reference path="../node_modules/@types/googlemaps/index.d.ts"/>

declare module "google" {
  declare var google: any;
  export = google;
}
