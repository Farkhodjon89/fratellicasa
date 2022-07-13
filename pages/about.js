import Layout from '../components/layout'
import AboutOne from '../components/about-one'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const About = ({ categories }) => (
  <Layout category={categories}>
    <AboutOne />
  </Layout>
)
export default About

export async function getStaticProps() {
  const result = await client.query({
    query: CATEGORIES,
  })

  return {
    props: {
      categories: result.data.productCategories.edges,
    },
    revalidate: 1,
  }
}
