---
title: Automatically Invoke Claude Code From Linear
date: 2026-10-02
description:
taxonomies:
  category:
    - Blog
extra: {}
---


Linear has their own coding agent, but I have an expensive Claude account, so I'd like to use it. To limit the friction of having Claude Code pick up an issue from Linear, I've set up a little flow that does this automatically:

1. I assign the <span style="font-size:12px;font-weight:400;border:1px solid #444; padding: 0 8px; line-height: 24px; border-radius: 22px;display:inline-flex; align-items: center;"><span style="width:9px;height:9px;background:#51a350;border-radius:9px;margin-right:5px;"></span>claude-ready-to-build</span> label to an issue.
2. This triggers a webhook that calls out to a little <svg height="16" viewBox="-3.02291033 -.22032094 420.92291033 433.54032094" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m208.45 227.89c-1.59 2.26-2.93 4.12-4.22 6q-30.86 45.42-61.7 90.83-28.69 42.24-57.44 84.43a3.88 3.88 0 0 1 -2.73 1.59q-40.59-.35-81.16-.88c-.3 0-.61-.09-1.2-.18a14.44 14.44 0 0 1 .76-1.65q28.31-43.89 56.62-87.76 25.11-38.88 50.25-77.74 27.86-43.18 55.69-86.42c2.74-4.25 5.59-8.42 8.19-12.75a5.26 5.26 0 0 0 .56-3.83c-5-15.94-10.1-31.84-15.19-47.74-2.18-6.81-4.46-13.58-6.5-20.43-.66-2.2-1.75-2.87-4-2.86-17 .07-33.9.05-50.85.05-3.22 0-3.23 0-3.23-3.18 0-20.84 0-41.68-.06-62.52 0-2.32.76-2.84 2.94-2.84q51.19.09 102.4 0a3.29 3.29 0 0 1 3.6 2.43q27 67.91 54 135.77 31.5 79.14 63 158.3c6.52 16.38 13.09 32.75 19.54 49.17.77 2 1.57 2.38 3.59 1.76 17.89-5.53 35.82-10.91 53.7-16.45 2.25-.7 3.07-.23 3.77 2 6.1 19.17 12.32 38.3 18.5 57.45.21.66.37 1.33.62 2.25-1.28.47-2.48 1-3.71 1.34q-61 19.33-121.93 38.68c-1.94.61-2.52-.05-3.17-1.68q-18.61-47.16-37.31-94.28-18.29-46.14-36.6-92.28c-1.83-4.62-3.63-9.26-5.46-13.88-.29-.79-.69-1.48-1.27-2.7z" fill="#fa7e14"/></svg> AWS Lambda function which calls the Claude Routines API to start a Claude execution.
3. It adds a <span style="font-size:12px;font-weight:400;border:1px solid #444; padding: 0 8px; line-height: 24px; border-radius: 22px;display:inline-flex; align-items: center;"><span style="width:9px;height:9px;background:#bf6037;border-radius:9px;margin-right:5px;"></span>claude-building</span> label to the issue and comments with the Claude session URL in case I want to follow along.
4. Claude Code does it's normal thing, opens a PR, moves the issue to 'In review' and comments with any specifics.



<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>