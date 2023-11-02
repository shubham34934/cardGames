import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import Game from "../../components/Game"

type Props = {
  games: any
}

const Games: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Games</h1>
        <main>
          {props.games.map((game) => (
            <div key={game.id} className="game">
              <Game game={game}/>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .game {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .game:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .game + .game {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/game")
  const games = await res.json()
  return {
    props: { games },
  }
}

export default Games
