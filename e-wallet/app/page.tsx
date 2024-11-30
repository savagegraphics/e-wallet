// import Head from 'next/head'
import Hero from './Home/Hero'
import Footer from './Home/Footer'
import FeatureGrid from './Home/FeatureGrid'
// import Base from './Home/Base'

const Home = () => {
  return (
    <div>
      {/* <Head>
        <title>COIN NODE</title>
        <meta
          name='description'
          content='Securely communicate between wallets and dapps with COIN NODE.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}
      <Hero />
      {/* <Base/> */}
      <FeatureGrid />
      <Footer />
    </div>
  )
}

export default Home
