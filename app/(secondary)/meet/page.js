export default function Meet() {
  return (
    <>
      <h1>Let's talk.</h1>
      <p>
        Let's have a 30 minute call via Zoom or a coffee break some place in the
        beautiful Hoxton area (London, UK).
      </p>

      <div
        style={{
          minWidth: 300,
          height: 1000,
          borderRadius: 8,
          border: "none",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <iframe
          title="Schedule a call or coffee meeting."
          src="https://calendly.com/tschof/30min?embed_domain=localhost%3A8000&amp;embed_type=Inline&amp;hide_event_type_details=1&amp;background_color=fff&amp;primary_color=355fc5"
          width="100%"
          height="100%"
          style={{ borderRadius: 8 }}
          frameBorder="0"
        />
      </div>
    </>
  );
}

export const metadata = {
  title: "Schedule a meeting",
};
