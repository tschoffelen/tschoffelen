import React from "react";

const ProjectLinks = () => {
  return (
    <div className="section">
      <h3 className="section-title">What I'm working on</h3>
      <div className="projects-grid">
        <a
          href="https://www.near.st/?utm_source=schof.co"
          className="link p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          NearSt
          <span className="sr"> - </span>
          <span className="link-description">
            Making products visible online to get more in-store customers.
          </span>
        </a>
        <a
          href="https://streetartcities.com/?utm_source=schof.co"
          className="link p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Street Art Cities
          <span className="sr"> - </span>
          <span className="link-description">
            The world's largest street art community platform and app.
          </span>
        </a>
        <a
          href="https://infowijs.nl/?utm_source=schof.co"
          className="link p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Infowijs
          <span className="sr"> - </span>
          <span className="link-description">
            Communication tools used by 100s of Dutch schools.
          </span>
        </a>
        <a
          href="https://sueterapp.com/?utm_source=schof.co"
          className="link p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sueter
          <span className="sr"> - </span>
          <span className="link-description">
            A unique circular and sustainable fashion rental platform.
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProjectLinks;
