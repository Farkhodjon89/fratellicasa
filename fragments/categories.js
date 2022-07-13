import gql from 'graphql-tag'

export const ProductCategoriesFragment = gql`
  fragment ProductCategories on ProductCategory {
    databaseId
    name
    slug
    parent {
      node {
        id
        parent {
          node {
            databaseId
          }
        }
      }
    }
    children(first: 50) {
      nodes {
        databaseId
        name
        slug
      }
    }
  }
`
