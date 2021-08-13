import { Milliseconds, Pixels } from "../core/types";
import { Cells, PixelsPerSecond } from "./types";

const smoothing: Cells = 10;
const segmentLength: Pixels = 10;
const verticesPerLine = 100;
const speedScale = 0.1;
const linesPerVisualization = 4000;
const minSpeedThreshold: PixelsPerSecond = 0.001;
const minWeightThreshold = 0.001;
const flowProcessingQuanta: Milliseconds = 100;
const lineWidth = 10;
const speed50 = 50;
const time2 = 2;
const trailDecay = 0.01;
const trailSpeedAttenuationExponent = 10000;

export default {
  smoothing,
  segmentLength,
  verticesPerLine,
  speedScale,
  linesPerVisualization,
  minSpeedThreshold,
  minWeightThreshold,
  flowProcessingQuanta,
  lineWidth,
  speed50,
  time2,
  trailDecay,
  trailSpeedAttenuationExponent
};