import LayoutApplication from '../components/layout-application'
import ApplicationCart from '../components/application-cart'
import client from '../apollo/apollo-client'
import PRODUCTS from '../queries/products'
import { connect } from 'react-redux'
import { addToCart, decreaseQuantity, deleteFromCart, cartItemStock } from '../redux/actions/cartActions'

const Application = ({ cartItems, addToCart, decreaseQuantity, deleteFromCart, products }) => {
  return (
    <LayoutApplication>
      <ApplicationCart
        cartItems={cartItems}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        deleteFromCart={deleteFromCart}
        cartItemStock={cartItemStock}
        products={products}
      />
    </LayoutApplication>
  )
}
const mapStateToProps = state => {
  return {
    cartItems: state.cartData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => {
      dispatch(addToCart(item))
    },
    decreaseQuantity: (item, joki) => {
      dispatch(decreaseQuantity(item, joki))
    },
    deleteFromCart: item => {
      dispatch(deleteFromCart(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)

export async function getStaticProps() {
  const result = await client.query({
    query: PRODUCTS,
    variables: { first: 4 }
  })
  return {
    props: {
      products: result.data.products.nodes
    },
    revalidate: 1
  }
}
