import React from 'react'
import Router from 'next/router'

export type UserProps = {
  id: number;
  name: string;
  email: String;
}

const Post: React.FC<{user: UserProps}> = ({ user }) => {
  const authorEmail =  user.email ;
  return (
    <div onClick={() => Router.push('/user/[id]', `/user/${user.id}`)}>
        <h2>{user.name}</h2>
        <small>{authorEmail}</small>
        {/* <ReactMarkdown children={post.content} /> */}
        <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
            cursor: pointer;
          }
        `}</style>
    </div>
  )
}

export default Post