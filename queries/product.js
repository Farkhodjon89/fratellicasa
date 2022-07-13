import gql from 'graphql-tag'
import { ProductCategoriesFragment } from '../fragments/categories'
import { _Product, _SimpleProduct, _VariableProduct } from '../fragments/products'

const PRODUCT = gql`
  query PRODUCT($id: ID!) {
    productCategories(first: 50) {
      nodes {
        ...ProductCategories
      }
    }

    product(id: $id, idType: SLUG) {
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
      related(first: 4, where: { shuffle: true, stockStatus: IN_STOCK }) {
        nodes {
          ..._Product
          ... on SimpleProduct {
            ..._SimpleProduct
          }
          ... on VariableProduct {
            ..._VariableProduct
          }
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
  ${ProductCategoriesFragment}
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`
export default PRODUCT
