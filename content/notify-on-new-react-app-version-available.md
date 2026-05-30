---
title: Notify on New React App Version Available
date: 2026-05-30
description:
taxonomies:
  category:
    - Blog
extra: {}
---


Sometimes, you want to make sure you show a UI element to let the user know a new version of the front-app of your application is available.

<img src="https://mirri.link/3Yqilw6FQ" alt="Image" />

Prompting the user to reload the page to get the new front-end bundle is important, as your app's back-end might have changed to something that isn't compatible with an old version of the front-end.

## Detecting changes
To detect an update, the usual pattern is to do a HTTP fetch every 30 seconds or so, and see if something has changed.

There's a few ways to do this:

### Compare file contents
My app is built using Vite, which will automatically create a new unique name of the JS bundle served for each build:

```html
<script type="module" crossorigin src="/assets/index-DOay74m5.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-gBd2_900.css">
```

So a script could fetch this `index.html` and compare the paths agains the last version:

```ts
const fetchVersionFingerprint = async (): Promise<string | null> => {
  const res = await fetch(`/index.html?_=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return null;

  const assets = (await res.text()).match(/\/assets\/[^"']+\.(?:js|css)/g);
  return assets ? [...new Set(assets)].sort().join(",") : null;
};
```

### Compare HTTP headers
A more universal method might be checking the `ETag` header - if you have a static file being served for `index.html` (e.g. through AWS S3), the `ETag` will have a hash based on the contents of the file, so it will only change once the file has changed.

```ts
const fetchVersionTag = async (): Promise<string | null> => {
  const res = await fetch(`/index.html?_=${Date.now()}`, {
    method: "HEAD",
    cache: "no-store",
  });
  return res.ok ? res.headers.get("etag") : null;
};
```

## Showing a UI
I use `react-hot-toast`, one of my favourite React UI packages, to display a custom toast:

```tsx
const promptForUpdate = () => {
  toast(
    () => (
      <div className="flex items-center gap-3">
		A new version of Examplary is available.
        <Button onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    ),
    { duration: Infinity } // keep it on the screen
  );
};
```

And then a simple React component that deals with regularly checking, which I can add into my main `<App>` component:

```tsx
const POLL_INTERVAL_MS = 30_000;

export const VersionUpdateChecker = () => {
  const { t } = useTranslation();
  const baseline = useRef<string | null>(null);

  useEffect(() => {
    let interval;
  
    const check = async () => {
      const tag = await fetchVersionTag();
      if (!tag) return;

      if (baseline.current === null) {
        // First time: save the baseline
        baseline.current = tag;
      } else if (tag !== baseline.current) {
        // On change detected: show prompt
        promptForUpdate(t);
        clearInterval(interval);
      }
    };

    interval = setInterval(check, POLL_INTERVAL_MS);
    check();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};
```


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>