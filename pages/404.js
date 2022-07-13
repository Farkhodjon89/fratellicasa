import Layout from '../components/layout'
import ErrorOne from '../components/error-one'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const Help = ({ categories }) => (
  <Layout category={categories}>
    <ErrorOne />
  </Layout>
)
export default Help

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
