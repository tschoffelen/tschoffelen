import React from "react";

import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Hero from "../../components/Hero";

const ProductPage = () => (
  <Layout fullWidth>
    <SEO title="Thumbnails Cloud - Generate file thumbnails on demand"/>

    <Hero className='thumbnails-cloud'>
      <h1>Thumbnails Cloud</h1>
      <h2>Turn boring document icons into image previews of 50+ file types.</h2>
      <button onClick={() => window.open("https://thumbnails.cloud/?checkout")}>
        Get an API key
      </button>
    </Hero>

    <main>
      <h4>Features</h4>
      <p>The <strong>thumbnails.cloud</strong> API generates JPG
        file previews for all common document formats, using a simple API. Get an API token for $8/mo, and
        create an unlimited number of thumbnails!</p>

      <h4>Examples</h4>
      <p>The API supports a ton of formats, but here are some examples:</p>
      <table>
        <tbody>
          <tr>
            <th width="25%">
              <a href="https://lowcdn.com/2x/bf7/598f234dbb76-0037a0222e/example.doc">example.doc</a></th>
            <th width="25%">
              <a href="https://lowcdn.com/2x/a4b/5054667bf29b-00397017f1/example-docx.docx">example.docx</a>
            </th>
            <th width="25%">
              <a href="https://lowcdn.com/2x/756/f6d9194b1767-0051f03200/example.ai">example.ai</a></th>
            <th width="25%">
              <a href="https://lowcdn.com/2x/7a7/edfb731fd240-00aff01a99/example.eps">example.eps</a></th>
          </tr>
          <tr>
            <td width="25%"><a
              data-mediabox="doc"
              href="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/bf7/598f234dbb76-0037a0222e/example.doc&size=1200">
              <img src="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/bf7/598f234dbb76-0037a0222e/example.doc&size=1200"/>
            </a></td>
            <td width="25%"><a
              data-mediabox="docx"
              href="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/a4b/5054667bf29b-00397017f1/example-docx.docx&size=1200">
              <img src="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/a4b/5054667bf29b-00397017f1/example-docx.docx&size=1200"/>
            </a></td>
            <td width="25%"><a
              data-mediabox="ai"
              href="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/756/f6d9194b1767-0051f03200/example.ai&size=1200">
              <img src="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/756/f6d9194b1767-0051f03200/example.ai&size=1200"/>
            </a></td>
            <td width="25%"><a
              data-mediabox="eps"
              href="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/7a7/edfb731fd240-00aff01a99/example.eps&size=1200">
              <img src="https://thumbnails.cloud/v1/jpg?token=example&url=https://lowcdn.com/2x/7a7/edfb731fd240-00aff01a99/example.eps&size=1200"/>
            </a></td>
          </tr>
        </tbody>
      </table>
      <h4>Usage</h4> <p>URL structure:</p>
      <pre className='code-block'><code>{`https://thumbnails.cloud/v1/jpg
  ?token=your-api-token
  &url=https://example.com/my-file.doc
  &size=600
  &mode=crop`}</code></pre>
      <p>Simply change <code>jpg</code> to <code>pdf</code> to get a PDF preview instead.</p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>url</code></td>
            <td><span
              className="icon has-text-success"
              title="Required"><i className="fas fa-check-square"/></span></td>
            <td>The URL of the original document. Should be publicly available via HTTP or HTTPS. Make sure
              to <a href="https://en.wikipedia.org/wiki/Percent-encoding" target="_blank">urlencode</a> your
              URL!
            </td>
          </tr>
          <tr>
            <td><code>token</code></td>
            <td><span
              className="icon has-text-success"
              title="Required"><i className="fas fa-check-square"/></span></td>
            <td>Your API token. Sign up above.</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><span
              className="icon has-text-warning"
              title="Optional"><i className="fas fa-minus-square"/></span></td>
            <td>Pixel width of your thumbnail. Defaults to 600.</td>
          </tr>
          <tr>
            <td><code>mode</code></td>
            <td><span
              className="icon has-text-warning"
              title="Optional"><i className="fas fa-minus-square"/></span></td>
            <td>Specify <code>crop</code> to get a square image, or <code>orig</code> to maintain original
              aspect ratio. Defaults to <code>crop</code>.
            </td>
          </tr>
        </tbody>
      </table>
      <h4>Supported file extensions</h4>
      <p>You can query the <code>/v1/extensions</code> endpoint to get an up-to-date overview of the supported
        file extensions. Note that this refers to the file types that can be converted into JPG, PDF support
        is currently slightly more limited.</p>
      <h4>How we handle your data</h4>
      <p>We care about privacy, and know that you might be using our API to create previews for potentially
        confidential documents. That's why we don't log the URLs of the documents you convert, nor do we keep
        the original documents after we've converted them.</p>
      <p>We do however temporarily store the create preview image using on our CDN servers, to allow hot
        linking to dynamic previews, without having to recreate the preview image on every request. There is,
        however, no way for other users of the service to access a list of the files you converted through the
        API.</p>
      <p>
        <a
          href="https://www.producthunt.com/posts/thumbnails-cloud?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-thumbnails-cloud"
          target="_blank">
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=164600&theme=dark"
            alt="Thumbnails Cloud - The simplest API for generating file thumbnails | Product Hunt Embed"/>
        </a>
      </p>
    </main>
  </Layout>
);

export default ProductPage;
