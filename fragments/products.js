import gql from 'graphql-tag'

export const _Product = gql`
  fragment _Product on Product {
    id
    databaseId
    sku
    slug
    name
    onSale
    type
    image {
      sourceUrl
    }
    galleryImages {
      nodes {
        sourceUrl
      }
    }
  }
`

export const _SimpleProduct = gql`
  fragment _SimpleProduct on SimpleProduct {
    id
    woocsRegularPrice
    woocsSalePrice
    woocsRegularPriceUSD
    woocsSalePriceUSD

    stockQuantity
    length
    width
    materialName: metaData(key: "_material") {
      value
    }
    terms: paColors {
      nodes {
        color
        name
      }
    }
    productCategory: productCategories {
      nodes {
        name
      }
    }
    weight
  }
`

export const _VariableProduct = gql`
  fragment _VariableProduct on VariableProduct {
    id
    woocsRegularPrice
    woocsSalePrice
    woocsRegularPriceUSD
    woocsSalePriceUSD
    materialName: metaData(key: "_material") {
      value
    }
    productCategory: productCategories {
      nodes {
        name
      }
    }
    weight
    variations(first: 100) {
      nodes {
        length
        width
        id
        databaseId
        sku
        name
        stockQuantity
        metaData {
          key
          value
        }
        image {
          sourceUrl
        }
        attributes {
          nodes {
            name
            value
            color
          }
        }
      }
    }
  }
`
