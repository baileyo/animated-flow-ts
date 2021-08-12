/*
  Copyright 2021 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * @module wind-es/flow/types
 *
 * This module contains simple type definitions used by the `flow` visualization.
 */

/**
 * A pixel block as returned by `ImageryTileLayer.fetchPixels()` into the property `pixelBlock`
 * of the fetched raster data object.
 */
export type PixelBlock = {
  /**
   * The width of the block in pixels.
   */
  width: number;

  /**
   * The height of the block in pixels.
   */
  height: number;

  /**
   * The pixel data.
   *
   * Pixel data is stored:
   *
   * - Linearly;
   * - One scanline at a time, starting from the top scanline;
   * - In separated channels.
   *
   * The first index into the `pixel` multidimensional array
   * specifies the channel, while the second index specifies
   * a scalar pixel value.
   *
   * As an example, consider a magnitude/direction raster as
   * returned by a query to an image server.
   *
   * Here are some examples.
   *
   * - pixels[0][0] is the first pixel of the magnitude channel;
   * - pixels[1][0] is the first pixel of the direction channel;
   * - pixels[0][width - 1] is the last pixel of the first (top)
   *   scanline of the magnitude channel;
   * - pixels[0][width * height - 1] is the last pixel of the
   *   last (bottom) scanline of the magnitude channel.
   */
  pixels: number[][];
};

/**
 * A vertex of a flow line, as returned by The `trace()` function in
 * module `wind-es/flow/shared.
 *
 * A flow line is a polyline where each vertex is timestamped in seconds.
 */
export type FlowLineVertex = {
  /**
   * The position of the vertex.
   *
   * Coordinates are expressed in "visualization units"; see module
   * wind-es/core/visualization for more details.
   */
  position: [number, number];

  /**
   * The timestamp associated to this position, in seconds.
   *
   * Timestamps are used to animate flow; the first vertex is
   * associated to timestamp 0 and the last one is timestamped
   * with the time that it takes the flow to complete one run
   * through the line. Note that this is not the period of the
   * animation; after the flow has started exiting the end of
   * the polyline, we wait an extended period of time to allow
   * for the trail to fully fade.
   */
  time: number;
};

/**
 * The mesh data as returned by createFlowLinesMesh...
 */
export type FlowLinesMesh = {
  vertexData: Float32Array;
  indexData: Uint32Array;
};

/**
 * A 2D vector field.
 */
export type Field = (x: number, y: number) => [number, number];

/**
 * A 2D grid of horizontal and vertical speeds in screen space.
 */
export type FlowData = {
  /**
   * Horizontal and vertical speeds.
   * 
   * The speeds are stored interleaved, row major,
   */
  data: Float32Array;
  columns: number;
  rows: number;
  gridScale: number;
};

export type TransferableFlowData = {
  buffer: ArrayBuffer;
  columns: number;
  rows: number;
  gridScale: number;
};

/**
 * A flow source is a gate
 */
export interface FlowSource {
  fetchFlowData(extent: Extent, width: number, height: number, signal: AbortSignal): Promise<FlowData>;
  destroy(): void;
}

export interface FlowTracer {
  createFlowLinesMesh(flowData: FlowData, smoothing: number, signal: AbortSignal): Promise<FlowLinesMesh>;
  destroy(): void;
}
