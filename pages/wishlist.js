import Layout from '../components/layout'
import WishlistOne from '../components/wishlist-one'
import { connect } from 'react-redux'
import { deleteFromWishlist } from '../redux/actions/wishlistActions'
import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const Wishlist = ({ wishlistItems, deleteFromWishlist, categories }) => {
  return (
    <Layout category={categories}>
      <WishlistOne wishlistItems={wishlistItems} deleteFromWishlist={deleteFromWishlist} />
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    wishlistItems: state.wishlistData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteFromWishlist: item => {
      dispatch(deleteFromWishlist(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)

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
