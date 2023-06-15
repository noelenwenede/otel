import * as opentelemetry from "@opentelemetry/sdk-node";
import {
  getNodeAutoInstrumentations,
} from "@opentelemetry/auto-instrumentations-node";
import {
  OTLPTraceExporter,
} from "@opentelemetry/exporter-trace-otlp-proto";
import {
  OTLPMetricExporter
} from "@opentelemetry/exporter-metrics-otlp-proto";
import {
  PeriodicExportingMetricReader
} from "@opentelemetry/sdk-metrics";

console.log(process.env.OTLP_TRACING_URL, process.env.OTLP_METRICS_URL);

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: process.env.OTLP_TRACING_URL,
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: process.env.OTLP_METRICS_URL, // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      headers: {}, // an optional object containing custom headers to be sent with each request
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: "example-node-app"
});
sdk.start();