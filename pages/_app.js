import '../styles/globals.css'
import Layout1 from '../components/Layouts.js/Layout1'

function MyApp({ Component, pageProps }) {
  return <Layout1>
    <Component {...pageProps} />
  </Layout1>
}

export default MyApp
