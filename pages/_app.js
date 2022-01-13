import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
