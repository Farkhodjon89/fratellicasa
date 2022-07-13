import LayoutApplication from '../components/layout-application'
import ApplicationPayment from '../components/application-payment'
import { connect } from 'react-redux'

const Application = ({ cartItems }) => {
  //process.browser && fbq('track', 'InitiateCheckout')
  return (
    <LayoutApplication>
      <ApplicationPayment cartItems={cartItems} />
    </LayoutApplication>
  )
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  }
}

export default connect(mapStateToProps, null)(Application)
