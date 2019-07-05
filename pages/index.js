import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'

import Layout from '../components/layout'

const Index = ({ posts }) => (
  <Layout>
    <div className="content-inner h-card">
      <h2 className="p-name">Hi, I'm Thomas.</h2>

      <p className="p-note">
        I create simple solutions for day-to-day problems in business and communication.
        I build apps, design interfaces, draft technical documentation and
        occasionally write articles.
      </p>

      <div className="links">
        {posts.map((post) => (
          <a href={`https://medium.com/p/${post.id}`} rel="noopener" target="_blank">
            {moment(post.createdAt).format('YYYY/MM')} &ndash; {post.title}
          </a>
        ))}
      </div>

      <p>
        I've co-founded a few companies, some of which are doing really cool
        things in really interesting spaces. Or so I think, it might be possible
        that I'm slightly biased.
      </p>

      <div className="links">
        <a
          href="http://near.st/?utm_source=thomasschoffelen.com"
          className="p-org"
          rel="noopener"
          target="_blank">
          NearSt: providing shops a new generation of customers
        </a>
        <a
          href="http://infowijs.nl/?utm_source=thomasschoffelen.com"
          className="p-org"
          rel="noopener"
          target="_blank">
          Infowijs: enabling schools to communicate better
        </a>
        <a
          href="https://streetartcities.com/?utm_source=thomasschoffelen.com"
          className="p-org"
          rel="noopener"
          target="_blank">
          Street Art Cities: documenting street art across the world
        </a>
      </div>

      <p>
        I'm always looking for new challenges, new people to meet or new things
        to learn. Also, I'm always available for a cup of coffee somewhere near
        Amsterdam or London.
      </p>

      <div className="links">
        <a href="mailto:thomas@includable.com" className="u-email" rel="author">
          Send me an email
        </a>
        <a href="https://github.com/tschoffelen" className="u-url" rel="noopener" target="_blank">
          See my code on Github
        </a>
        <a href="https://instagram.com/tschoffelen" className="u-url" rel="noopener" target="_blank">
          Follow me on Instagram
        </a>
        <Link href="/pgp">
          Grab my PGP key
        </Link>
      </div>

      <div style={{ display: 'none' }} aria-hidden="true">
        <img className="u-photo" src="/static/avatar.png"/>
        <a href="https://thomasschoffelen.com" className="u-url u-uid">Thomas Schoffelen</a>
      </div>
    </div>
  </Layout>
)

Index.getInitialProps = async () => {
  let data = await axios.get('https://medium.com/@tschoffelen/latest?format=json&limit=6')
  data = JSON.parse(data.data.replace('])}while(1);</x>', ''))

  return {
    posts: Object
      .values(data.payload.references.Post)
      .map(({ id, title, createdAt }) => ({ id, title, createdAt }))
  }
}

export default Index
