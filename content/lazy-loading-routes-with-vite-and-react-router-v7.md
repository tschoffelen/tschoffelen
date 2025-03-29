---
title: Lazy Loading Routes with Vite and React Router v7
date: 2025-01-19
description: Recently, we switched the Street Art Cities dashboard (where users upload artworks, create routes, view insights, etc.) from a massive monolithic...
taxonomies:
  category:
    - Blog
extra: {}
---


Recently, we switched the [Street Art Cities](https://streetartcities.com) dashboard (where users upload artworks, create routes, view insights, etc.) from a massive monolithic [Next.js](https://nextjs.org/) app – that also contained the many pages of our website! – to a standalone React app using [React Router](https://reactrouter.com/) and [Vite](https://vite.dev/).

We have dashboard for various different roles - hunter, artist, country manager, admin, etc. To make sure not everyone needs to load all the Javascript for each dashboard, even if they don't have access to it, I set up chunking and lazy loading for various sub-routes of the dashboard.

## Updating our router
Previously, our main router looked like this:

```js
import HunterRoutes from './routes/hunter';
import AdminRoutes from './routes/admin';

const App = () => {
  return (
    <Routes>
      <Route path="hunter/*" element={<HunterRoutes />} />
      <Route path="admin/*" element={<AdminRoutes />} />
      // ...
    </Routes>
  );
}
```

This is a perfect setup for lazy loading, since the various dashboards are already clumped together using sub-routes.

We can combine Vite's dynamic [`import()`](https://vite.dev/guide/features.html#dynamic-import) function and React's [`lazy()`](https://react.dev/reference/react/lazy) to get this done. I've started by introducing a helper component that combines them:

```js
const Lazy = ({ component }) => {
  const Component = React.lazy(component);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};
```

We can use it like this:

```js
const HunterRoutes = () => import('./routes/hunter');
const AdminRoutes = () => import('./routes/admin');

const App = () => {
  return (
    <Routes>
      <Route path="hunter/*" element={
	    <Lazy component={HunterRoutes} />
	  } />
	  <Route path="admin/*" element={
	    <Lazy component={AdminRoutes} />
	  } />
	  // ...
    </Routes>
  );
}
```

**Important**: we need to make sure we define the `import()` with a pre-set value. Before, I tried to abstract this further by passing `path` prop into the `<Lazy>` component, and having the `import()` in the component, but that means Vite can't resolve the reference during build-time.

That means that even though it works in development mode, in production it will try to load `./routes/hunter`, which probably won't exist in your bundled code!

## Chunking strategy
By default, Vite (and [Rollup](https://rollupjs.org/), which Vite uses under the hood) will try to intelligently chunk our dependencies. It's not always amazing at it though, so in cases like this, where there is a clear-cut distinction in when users will need certain bits of code.

Rollup allows you to define a [`manualChunks`](https://rollupjs.org/configuration-options/#output-manualchunks) configuration option where you can pass a function that determines the chunk a certain file of source could should be put into.

Here's how you can use this in the `vite.config.js`:

```js
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const match = /src\/routes\/([\w-]+)\//.exec(id);
          if (match) {
            return match[1];
          }
        },
      },
    },
  },
});
```

The parameter `id` here refers to the full path for the input file. In this example, we match files like `src/routes/admin/AdminDashboard.jsx` and puts them in a chunk based on the first directory within `src/routes`.

The result is a chunk per dashboard section:
<img src="https://mirri.link/BUcRgnJ" alt="Image" />

This is a massive improvement over the 'before' state:
<img src="https://mirri.link/qjnmKor" alt="Image" />

That means that all of our hunters and artists no longer need to load the almost 3 megabytes of JS that is only used in the admin dashboard!

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>
