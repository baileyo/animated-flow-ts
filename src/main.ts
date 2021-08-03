/**
 * @module wind-es/main
 * 
 * The entry point of the app.
 * 
 * Create a WGS-84 map with a basemap and a wind layer.
 */

import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import { WindLayer } from "./wind/wind-layer";

const vectorTileLayer = new VectorTileLayer({
  url: "https://www.arcgis.com/sharing/rest/content/items/55253142ea534123882314f0d880ddab/resources/styles/root.json"
});

const windLayer = new WindLayer({
  effect: "bloom(1.1, 0.3px, 0.1)",
  useWebWorkers: true
} as any);

const map = new EsriMap({
  layers: [vectorTileLayer, windLayer]
});

new MapView({
  container: "viewDiv",
  map: map,
  zoom: 4,
  center: [-98, 39]
});
