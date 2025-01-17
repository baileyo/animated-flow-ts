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
 * @module animated-flow-ts/flow/processors
 * 
 * This module defines classes that convert the `FlowData` returned
 * from a flow source to a triangle mesh.
 */

import { createStreamLinesMesh } from "./shared";
import { StreamLinesMesh, FlowData, FlowProcessor } from "./types";
import * as workers from "esri/core/workers";
import { throwIfAborted } from "../core/util";

/**
 * Processor that runs the computation on the main process.
 */
export class MainFlowProcessor implements FlowProcessor {
  async createStreamLinesMesh(
    flowData: FlowData,
    signal: AbortSignal
  ): Promise<StreamLinesMesh> {
    return createStreamLinesMesh(flowData, signal);
  }

  destroy(): void {
  }
}

/**
 * Processor that runs the computation on the worker process.
 */
export class WorkerFlowProcessor implements FlowProcessor {
  private connection = workers.open("animated-flow-ts/workers/flow");

  async createStreamLinesMesh(
    flowData: FlowData,
    signal: AbortSignal
  ): Promise<StreamLinesMesh> {
    const connection = await this.connection;

    throwIfAborted(signal);

    const result = await connection.invoke(
      "createStreamLinesMesh",
      {
        flowData: {
          ...flowData,
          buffer: flowData.data.buffer
        }
      },
      {
        transferList: [flowData.data.buffer],
        signal
      }
    );

    return {
      vertexData: new Float32Array(result.vertexBuffer),
      indexData: new Uint32Array(result.indexBuffer)
    };
  }

  async destroy(): Promise<void> {
    const connection = await this.connection;
    connection.close();
  }
}
