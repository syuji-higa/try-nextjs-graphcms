import Link from 'next/link';
import { useRouter } from 'next/router'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/graphcms'

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data.post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug()
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

export default function Post({ preview, post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      {preview &&
        <p style={{color: '#c00'}}>
          <a href="/api/exit-preview">Preview Mode</a>
        </p>
      } 
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.content.html}} />
      <Link href="/">
        <a>&lt;&lt; Home</a>
      </Link>
    </>
  )
}
