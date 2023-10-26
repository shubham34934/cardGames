import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
        <main>
          {props.feed.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/feed')
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const feed = await res.json()
    return {
      props: { feed },
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { feed: [] }, // Provide a default value in case of an error
    };
  }
}


export default Blog
