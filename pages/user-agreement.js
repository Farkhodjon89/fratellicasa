import Layout from '../components/layout'
import UserAgreementOne from '../components/user-agreement-one'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const UserAgreement = ({ categories }) => (
  <Layout category={categories}>
    <UserAgreementOne />
  </Layout>
)
export default UserAgreement

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
