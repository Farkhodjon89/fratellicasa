import Layout from '../components/layout'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const ZoodpaySuccess = ({ categories }) => (
  <Layout category={categories}>
    <div className='zoodpay'>
      Благодарим за покупку! <br /> Наш консультант выйдет на связь с вами в
      ближайшее время.
    </div>
  </Layout>
)
export default ZoodpaySuccess

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
