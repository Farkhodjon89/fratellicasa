import gql from 'graphql-tag'
import {
  _Product,
  _SimpleProduct,
  _VariableProduct,
} from '../fragments/products'

const PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $minPrice: Float
    $maxPrice: Float
    $onSale: Boolean
    $search: String
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        minPrice: $minPrice
        maxPrice: $maxPrice
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      activeTerms {
        paColors {
          name
          slug
          color
        }
        paSizes {
          name
          slug
        }
      }
      nodes {
        ..._Product
        status
        description
        averageRating
        type
        attributes {
          nodes {
            name
            options
          }
        }
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`

export default PRODUCTS
