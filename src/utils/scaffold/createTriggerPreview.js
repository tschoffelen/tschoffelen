export const createTriggerPreview = (events) => {
  return events
    .map((event) => {
      switch (event.type) {
        case "httpGet":
        case "httpPost":
        case "httpPut":
        case "httpDelete":
        case "httpAny":
          return `${event.type.substring(4).toUpperCase()} ${event.path}`;
        case "scheduleRate":
          return `Every ${event.rate}`;
        case "scheduleCron":
          return `Cron ${event.cron}`;
        case "s3ObjectCreated":
          return `S3 object created in ${event.bucket}`;
        case "eventBridgeBus":
          return `EventBridge`;
        case "eventBridgeSource":
          return `EventBridge ${event.source}`;
        default:
          return null;
      }
    })
    .filter((event) => !!event)
    .join(", ");
};
