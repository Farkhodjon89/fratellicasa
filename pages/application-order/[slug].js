import LayoutApplication from '../../components/layout-application'
import ApplicationOrder from '../../components/application-order'
import client from '../../apollo/apollo-client'
import { ORDER_DATA } from '../../queries/order'

const Application = ({ order }) => {
  let payment = false
  if (
    order.paymentMethodTitle === 'payme' ||
    order.paymentMethodTitle === 'click'
  ) {
    payment = true
  }

  return order.status === 'PENDING' && payment ? (
    process.browser && window.location.assign('/application-payment')
  ) : (
    <>
      <LayoutApplication order={order}>
        <ApplicationOrder order={order} />
      </LayoutApplication>
    </>
  )
}

export default Application

export const getServerSideProps = async ({ params }) => {
  let result
  try {
    result = await client.query({
      query: ORDER_DATA,
      variables: { id: params.slug },
    })
  } catch (err) {
    throw err
  }

  return {
    props: {
      order: result.data.order,
    },
  }
}
