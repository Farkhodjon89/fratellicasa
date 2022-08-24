import gql from 'graphql-tag'

const CATEGORIES = gql`
  query {
    productCategories(
      first: 100
      where: {
        hideEmpty: true
        include: [6493, 6496, 6424, 6426]
        orderby: TERM_ID
      }
    ) {
      edges {
        node {
          id
          name
          slug
          products(
            first: 3
            where: { status: "publish", stockStatus: IN_STOCK }
          ) {
            nodes {
              id
              databaseId
              slug
              name
              image {
                sourceUrl
              }
            }
          }
          children(first: 100, where: { hideEmpty: true }) {
            nodes {
              id
              name
              slug
              products(where: { status: "publish", stockStatus: IN_STOCK }) {
                nodes {
                  id
                  name
                  image {
                    sourceUrl
                  }
                }
              }
              children(first: 100, where: { hideEmpty: true }) {
                nodes {
                  id
                  name
                  slug
                  image {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CATEGORIES
