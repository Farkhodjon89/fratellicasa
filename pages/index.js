import Layout from '../components/layout'
import HomeOne from '../components/home-one'
import HomeTwo from '../components/home-two'
import HomeThree from '../components/home-three'
import HomeFour from '../components/home-four'
import HomeFive from '../components/home-five'
import HomeSix from '../components/home-six'
import HomeSeven from '../components/home-seven'
import HomeEight from '../components/home-eight'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'
import PRODUCTS from '../queries/products'
import TopBanner from '../components/top-banner/top-banner'

const Home = ({ categories, products2, products3 }) => {
  return (
    <Layout category={categories}>
      {/*<TopBanner />*/}
      <HomeOne />
      <HomeTwo />
      <HomeThree />
      <HomeFour products={products2} />
      <HomeFive />
      <HomeSix />
      <HomeSeven products={products3.slice(3, 7)} />
      <HomeEight />
    </Layout>
  )
}
export default Home

export async function getStaticProps() {
  const result = await client.query({
    query: CATEGORIES,
  })
  const result2 = await client.query({
    query: PRODUCTS,
    variables: {
      first: 8,
      categories: 'svitshoty',
    },
  })

  const result3 = await client.query({
    query: PRODUCTS,
    variables: {
      first: 8,
      categories: 'svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-muzhskaya',
    },
  })

  return {
    props: {
      categories: result.data.productCategories.edges,
      products2: result2.data.products.nodes,
      products3: result3.data.products.nodes,
    },
    revalidate: 1,
  }
}
