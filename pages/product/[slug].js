import Layout from '../../components/layout'
import ProductCard from '../../components/product-card'
import ProductDetails from '../../components/product-details'
import ProductCardListMain from '../../components/product-card-list-main'
import client from '../../apollo/apollo-client'
import CATEGORIES from '../../queries/categories'
import PRODUCTS from '../../queries/products'
import PRODUCT from '../../queries/product'
import TOPCOLORS from '../../queries/topColors'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { HeadData } from '../../components/Head'
import { getPrice, getPriceValue } from '../../utils'

const Product = ({
  product,
  categories,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  topColors,
}) => {
  const materialName =
    product && product.materialName[0].value
      ? product.materialName[0].value
      : `Ткань состоит из двух переплетающихся систем нитей, расположенных
  взаимно перпендикулярно. Систему нитей, идущих вдоль ткани, называют
  основой, а систему нитей, расположенных поперек ткани, — утком.
  Соответствующие нити называют основными и уточными.`
  const [openCart, setOpenCart] = useState(false)

  return (
    <div key={product.id}>
      <HeadData
        title={`${product.name} | Fratelli Casa`}
        description={product.description}
        image={product?.image?.sourceUrl}
        product={product}
        pageUrl="/product/"
      />
      <Layout
        category={categories}
        openCart={openCart}
        setOpenCart={setOpenCart}
      >
        <ProductCard
          product={product}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          addToWishlist={addToWishlist}
          deleteFromWishlist={deleteFromWishlist}
          getActiveStatus={(r) => setOpenCart(r)}
          topColors={topColors}
        />
        <ProductDetails materialName={materialName} product={product} />
        <div className='recommend'>Fratelli Casa рекомендует</div>
        <ProductCardListMain products={product.related.nodes} />
      </Layout>
    </div>
  )
}

export const getStaticPaths = async () => {
  const paths = []

  const fetchProducts = async (after) => {
    const _tempProductsResult = await client.query({
      query: PRODUCTS,
      variables: {
        first: 10,
        ...(after ? { after } : {}),
      },
    })

    paths.push(
      ..._tempProductsResult.data.products.nodes.map((product) => ({
        params: { slug: product.slug },
      }))
    )

    if (_tempProductsResult.data.products.pageInfo.hasNextPage) {
      await fetchProducts(_tempProductsResult.data.products.pageInfo.endCursor)
    }
  }

  if (process.env.NODE_ENV === 'production') {
    await fetchProducts()
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  let response

  try {
    response = await client.query({
      query: PRODUCT,
      variables: { id: params.slug },
    })
  } catch (e) {
    return {
      notFound: true,
      revalidate: 30,
    }
  }

  let topColors

  try {
    topColors = await client.query({
      query: TOPCOLORS,
      variables: { terms: response.data.product.sku },
    })
  } catch (e) {
    return {
      notFound: true,
      revalidate: 30,
    }
  }

  const result2 = await client.query({
    query: CATEGORIES,
  })

  return {
    props: {
      product: response.data.product,
      categories: result2.data.productCategories.edges,
      topColors: topColors.data.products.nodes,
    },
    revalidate: 60,
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      quantityCount,
      selectedProductColor,
      selectedProductSize,
      selectedProductColorCode,
      selectedProductImage,
      selectedProductId
    ) => {
      dispatch(
        addToCart(
          item,
          quantityCount,
          selectedProductColor,
          selectedProductSize,
          selectedProductColorCode,
          selectedProductImage,
          selectedProductId
        )
      )
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
