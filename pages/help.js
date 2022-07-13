import Layout from '../components/layout'
import HelpOne from '../components/help-one'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const Help = ({ categories }) => (
  <Layout category={categories}>
    <HelpOne />
  </Layout>
)
export default Help

export async function getStaticProps() {
  const result = await client.query({
    query: CATEGORIES
  })

  return {
    props: {
      categories: result.data.productCategories.edges
    },
    revalidate: 1
  }
}
