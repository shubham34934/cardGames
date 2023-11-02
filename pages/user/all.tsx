import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import User, { UserProps } from '../../components/User'

type Props = {
  users: UserProps[]
}

const Blog: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>Users</h1>
        <main>
          {props.users.map(user => (
            <div key={user.id} className="post">
              <User user={user} />
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
    const res = await fetch('http://localhost:3000/api/user')
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const users = await res.json()
    return {
      props: { users },
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { users: [] }, // Provide a default value in case of an error
    };
  }
}


export default Blog
