import React from "react";

const ProjectLinks = () => {
  return (
    <div className="border-t border-gray-200 mt-10 pt-10 md:mt-16 md:pt-16">
      <h3 className="uppercase font-semibold text-gray-400 text-sm mb-6">
        What I'm working on
      </h3>
      <div className="grid md:grid-cols-2 gap-6 md:gap-x-20">
        <a
          href="https://www.near.st/?utm_source=schof.co"
          className="leading-relaxed group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="block font-bold group-hover:underline">NearSt</span>
          <span className="sr-only"> - </span>
            Making products visible online to get more in-store customers.
        </a>
        <a
          href="https://streetartcities.com/?utm_source=schof.co"
          className="leading-relaxed group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="block font-bold group-hover:underline">Street Art Cities</span>
          <span className="sr-only"> - </span>
          The world's largest street art community platform and app.
        </a>
        <a
          href="https://infowijs.nl/?utm_source=schof.co"
          className="leading-relaxed group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="block font-bold group-hover:underline">Infowijs</span>
          <span className="sr-only"> - </span>
          Communication tools used by 100s of Dutch schools.
        </a>
        <a
          href="https://sueterapp.com/?utm_source=schof.co"
          className="leading-relaxed group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="block font-bold group-hover:underline">Sueter</span>
          <span className="sr-only"> - </span>A unique circular and sustainable
          fashion rental platform.
        </a>
      </div>
    </div>
  );
};

export default ProjectLinks;
