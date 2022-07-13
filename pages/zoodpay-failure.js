import Layout from '../components/layout'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const ZoodpayFailure = ({ categories }) => (
  <Layout category={categories}>
    <div className='zoodpay'>
      Не получилось завершить транзакцию. <br /> Убедитесь, что вы ввели
      правильные данные и попробуйте снова.
    </div>
  </Layout>
)
export default ZoodpayFailure

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
