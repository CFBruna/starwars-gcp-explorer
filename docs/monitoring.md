# Cloud Monitoring Alert Policy

This document describes the Cloud Monitoring alerts configured for the Star Wars API in production.

## Alert Policies Created

### 1. High Error Rate Alert
**Trigger:** 5xx error rate > 0.05/s (approx 3 errors/min)
**Notification:** Email to deployment admin
**Severity:** WARNING

### 2. High CPU Usage Alert
**Trigger:** P99 CPU utilization > 80% for 5 minutes
**Notification:** Email to deployment admin
**Severity:** WARNING

### 3. High Memory Usage Alert
**Trigger:** P99 Memory utilization > 90% for 5 minutes
**Notification:** Email to deployment admin
**Severity:** CRITICAL

## Configuration Files (YAML)

Use these templates with `gcloud alpha monitoring policies create --policy-from-file=FILE.yaml`.

### `high_error_rate.yaml`

```yaml
displayName: "Star Wars API - High Error Rate"
documentation:
  content: "Alert when 5xx error rate exceeds 0.05 checks/sec (approx 3/min)"
  mimeType: "text/markdown"
conditions:
- displayName: "5xx Error Rate > 0.05/s"
  conditionThreshold:
    filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name="starwars-api" AND metric.type="run.googleapis.com/request_count" AND metric.labels.response_code_class="5xx"'
    aggregations:
    - alignmentPeriod: 60s
      perSeriesAligner: ALIGN_RATE
      crossSeriesReducer: REDUCE_SUM
    comparison: COMPARISON_GT
    thresholdValue: 0.05
    duration: 300s
    trigger:
      count: 1
notificationChannels:
- projects/YOUR_PROJECT_ID/notificationChannels/YOUR_CHANNEL_ID
combiner: OR
enabled: true
```

### `high_cpu_usage.yaml`

```yaml
displayName: "Star Wars API - High CPU Usage"
documentation:
  content: "Alert when P99 CPU usage exceeds 80% for 5 minutes"
  mimeType: "text/markdown"
conditions:
- displayName: "P99 CPU > 80%"
  conditionThreshold:
    filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name="starwars-api" AND metric.type="run.googleapis.com/container/cpu/utilizations"'
    aggregations:
    - alignmentPeriod: 60s
      perSeriesAligner: ALIGN_PERCENTILE_99
      crossSeriesReducer: REDUCE_MAX
    comparison: COMPARISON_GT
    thresholdValue: 0.8
    duration: 300s
    trigger:
      count: 1
notificationChannels:
- projects/YOUR_PROJECT_ID/notificationChannels/YOUR_CHANNEL_ID
combiner: OR
enabled: true
```

### `high_memory_usage.yaml`

```yaml
displayName: "Star Wars API - High Memory Usage"
documentation:
  content: "Alert when P99 Memory usage exceeds 90% for 5 minutes"
  mimeType: "text/markdown"
conditions:
- displayName: "P99 Memory > 90%"
  conditionThreshold:
    filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name="starwars-api" AND metric.type="run.googleapis.com/container/memory/utilizations"'
    aggregations:
    - alignmentPeriod: 60s
      perSeriesAligner: ALIGN_PERCENTILE_99
      crossSeriesReducer: REDUCE_MAX
    comparison: COMPARISON_GT
    thresholdValue: 0.9
    duration: 300s
    trigger:
      count: 1
notificationChannels:
- projects/YOUR_PROJECT_ID/notificationChannels/YOUR_CHANNEL_ID
combiner: OR
enabled: true
```

## Maintenance

**Verify/Edit Alerts:**
https://console.cloud.google.com/monitoring/alerting

**Adjust Thresholds:**
If alerts are too sensitive, increase `duration` to `600s` (10 mins) or `thresholdValue`.
