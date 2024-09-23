import axios from 'axios'
import { GetServerSideProps } from 'next/types'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/test')
    const data = response.data
    return {
      props: {
        users: data,
      },
    }
  } catch (error) {
    console.error('Error fetching patients data:', error)
    return {
      props: {
        users: [],
      },
    }
  }
}
export default function Home({ users }: any) {
  return (
    <main>
      <div>
        <h1>Custom Next Template </h1>
        <p>Make all necessary starting with _app.tsx</p>
        <p>Then add the database connection</p>
        <div>
          <h2>Users</h2>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
