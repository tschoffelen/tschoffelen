import React from "react";

const ProjectLinks = () => {
  return (
    <div className="p-8 md:p-16 max-w-[50rem] mx-auto md:border rounded-2xl md:my-16">
      <h3 className="font-semibold mb-6">What I'm working on</h3>
      <div className="grid md:grid-cols-2 gap-6 md:gap-x-20">
        <a
          href="https://www.near.st/?utm_source=schof.co"
          className="prose group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="border-b border-gray-800 text-gray-800 pb-0.5 group-hover:border-black group-hover:text-black transition">
            NearSt
          </span>
          <span className="sr-only"> - </span>
          <span className="block mt-1 group-hover:text-black transition">
            Making products visible online to get more in-store customers.
          </span>
        </a>
        <a
          href="https://streetartcities.com/?utm_source=schof.co"
          className="prose group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="border-b border-gray-800 text-gray-800 pb-0.5 group-hover:border-black group-hover:text-black transition">
            Street Art Cities
          </span>
          <span className="sr-only"> - </span>
          <span className="block mt-1 group-hover:text-black transition">
            The world's largest street art community platform and app.
          </span>
        </a>
        <a
          href="https://infowijs.nl/?utm_source=schof.co"
          className="prose group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="border-b border-gray-800 text-gray-800 pb-0.5 group-hover:border-black group-hover:text-black transition">
            Infowijs
          </span>
          <span className="sr-only"> - </span>
          <span className="block mt-1 group-hover:text-black transition">
            Communication tools used by 100s of Dutch schools.
          </span>
        </a>
        <a
          href="https://sueterapp.com/?utm_source=schof.co"
          className="prose group p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="border-b border-gray-800 text-gray-800 pb-0.5 group-hover:border-black group-hover:text-black transition">
            Sueter
          </span>
          <span className="sr-only"> - </span>
          <span className="block mt-1 group-hover:text-black transition">
            A unique circular and sustainable fashion rental platform.
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProjectLinks;
