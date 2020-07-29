import Head from 'next/head';
import Link from 'next/link';
import { getAllPostsForHome } from '../lib/graphcms'

export async function getStaticProps({ preview = false }) {
  const posts = (await getAllPostsForHome(preview)) || []
  return {
    props: {
      preview,
      posts,
    },
  };
}

export default function Home({ preview, posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {preview &&
        <p style={{color: '#c00'}}>
          <a href="/api/exit-preview">Preview Mode</a>
        </p>
      }

      <h1 style={{marginBottom: 40}}>Demo - Nuxt.js &amp; GraphCMS</h1>

      <main>
        {
          posts.map(({ slug, title, date, tags }) => (
            <article key={slug}>
              <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                <a>
                  <h2>{title}</h2>
                  <p>{date}</p>
                  <ul>
                    {
                      tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))
                    }
                  </ul>
                </a>
              </Link>
            </article>
          ))
        }
      </main>
    </div>
  )
}
