import React from "react";
import { HelpCircle, Trash } from "react-feather";

export const TextInput = ({ title, value, onChange, ...props }) => {
  const id = title.toLowerCase().replace(/[^\w]+/gi, "");
  return (
    <>
      <label for={id}>{title}</label>
      <input
        type="text"
        id={id}
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </>
  );
};

export const Checkboxes = ({
  title,
  options,
  value = [],
  onChange,
  ...props
}) => {
  return (
    <>
      <div className="label">{title}</div>
      <div className="checkboxes">
        {options.map((opt) => {
          if (typeof opt === "string") {
            opt = {
              id: opt,
              title: opt,
            };
          }
          return (
            <label className="checkbox">
              <input
                {...props}
                id={opt.id}
                type="checkbox"
                disabled={!!opt.disabled}
                checked={(value || []).includes(opt.id)}
                onChange={() => {
                  if ((value || []).includes(opt.id)) {
                    onChange((value || []).filter((v) => v !== opt.id));
                  } else {
                    onChange([...(value || []), opt.id]);
                  }
                }}
                value={opt.id}
              />
              {opt.title}
            </label>
          );
        })}
      </div>
    </>
  );
};

export const TriggerEditor = ({ value, onChange, name }) => {
  const updateTrigger = (id, key, val) => {
    onChange(
      value.map((event, eid) => {
        if (eid === id) {
          event[key] = val;
        }
        return event;
      })
    );
  };

  const addTrigger = () => {
    onChange([
      ...value,
      {
        type: "httpGet",
        path: `/${name.toLowerCase()}`,
        rate: "30 minutes",
        cron: "0 * * * ? *",
      },
    ]);
  };

  const removeTrigger = (id) => {
    onChange(value.filter((event, eid) => eid !== id));
  };

  return (
    <>
      <div className="label">Event triggers</div>
      <div className="triggers">
        {(value || []).map((event, id) => (
          <div className="trigger">
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              value={event.type}
              onChange={(e) => updateTrigger(id, "type", e.target.value)}
            >
              <optgroup label="API Gateway">
                <option value="httpAny">HTTP ANY</option>
                <option value="httpGet">HTTP GET</option>
                <option value="httpPost">HTTP POST</option>
                <option value="httpPut">HTTP PUT</option>
                <option value="httpDelete">HTTP DELETE</option>
              </optgroup>
              <optgroup label="EventBridge">
                <option value="scheduleRate">Schedule rate</option>
                <option value="scheduleCron">Schedule cron</option>
                <option value="eventBridgeSource">
                  EventBridge default bus
                </option>
                <option value="eventBridgeBus">EventBridge custom bus</option>
              </optgroup>
              <optgroup label="S3">
                <option value="s3ObjectCreated">S3 Object created</option>
              </optgroup>
            </select>
            <TriggerProperties
              event={event}
              onChange={(key, val) => updateTrigger(id, key, val)}
            />
            <span>
              <Trash
                onClick={() => removeTrigger(id)}
                color="#f92672"
                size={18}
              />
            </span>
          </div>
        ))}
        <button onClick={addTrigger}>Add trigger</button>
      </div>
    </>
  );
};

export const TriggerProperties = ({ event, onChange }) => {
  switch (event.type) {
    case "httpAny":
    case "httpGet":
    case "httpPost":
    case "httpPut":
    case "httpDelete":
      return (
        <>
          <input
            type="text"
            title="Endpoint"
            value={event.path || ""}
            onChange={(e) => onChange("path", e.target.value)}
            placeholder="/my-endpoint"
          />
          <span>
            <HelpCircle
              size={18}
              color="#355fc5"
              onClick={() =>
                window.open(
                  "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-routes.html"
                )
              }
            />
          </span>
        </>
      );
    case "scheduleRate":
      return (
        <>
          <input
            type="text"
            title="Rate expression"
            value={event.rate || ""}
            onChange={(e) => onChange("rate", e.target.value)}
            placeholder="30 minutes"
          />
          <span>
            <HelpCircle
              size={18}
              color="#355fc5"
              onClick={() =>
                window.open(
                  "https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html#rate-expressions"
                )
              }
            />
          </span>
        </>
      );
    case "scheduleCron":
      return (
        <>
          <input
            type="text"
            title="Cron expression"
            value={event.cron || ""}
            onChange={(e) => onChange("cron", e.target.value)}
            placeholder="* * * * ? *"
          />
          <span>
            <HelpCircle
              size={18}
              color="#355fc5"
              onClick={() =>
                window.open(
                  "https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html#cron-expressions"
                )
              }
            />
          </span>
        </>
      );
    case "eventBridgeSource":
      return (
        <>
          <input
            type="text"
            title="Event source filter"
            value={event.source || ""}
            onChange={(e) => onChange("source", e.target.value)}
            placeholder="my.source"
          />
          <span>
            <HelpCircle
              size={18}
              color="#355fc5"
              onClick={() =>
                window.open(
                  "https://docs.aws.amazon.com/eventbridge/latest/userguide/filtering-examples-structure.html#filtering-match-values"
                )
              }
            />
          </span>
        </>
      );
    case "eventBridgeBus":
      return (
        <>
          <input
            type="text"
            title="Event bus"
            value={event.bus || "default"}
            onChange={(e) => onChange("bus", e.target.value)}
            placeholder="default"
          />
          <span>
            <HelpCircle
              size={18}
              color="#355fc5"
              onClick={() =>
                window.open(
                  "https://docs.aws.amazon.com/eventbridge/latest/userguide/filtering-examples-structure.html#filtering-match-values"
                )
              }
            />
          </span>
        </>
      );
    case "s3ObjectCreated":
      return (
        <>
          <input
            type="text"
            title="Bucket name"
            value={event.bucket || ""}
            onChange={(e) => onChange("bucket", e.target.value)}
            placeholder="bucket name"
          />
          <span>
            <HelpCircle
              size={18}
              color="#355fc5"
              onClick={() =>
                window.open(
                  "https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#notification-how-to-event-types-and-destinations"
                )
              }
            />
          </span>
        </>
      );
    default:
      return null;
  }
};
