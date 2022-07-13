import LayoutApplication from '../components/layout-application'
import ApplicationInfo from '../components/application-info'
import { connect } from 'react-redux'

const Application = ({ cartItems }) => {
  return (
    <LayoutApplication>
      <ApplicationInfo cartItems={cartItems} />
    </LayoutApplication>
  )
}
const mapStateToProps = state => {
  return {
    cartItems: state.cartData
  }
}

export default connect(mapStateToProps, null)(Application)
