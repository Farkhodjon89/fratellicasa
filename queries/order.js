import gql from 'graphql-tag'

export const ORDER_DATA = gql`
  query Order($id: ID!) {
    order(id: $id, idType: ORDER_NUMBER) {
      currency
      date
      total(format: RAW)
      status
      paymentMethodTitle
      orderKey
      lineItems {
        nodes {
          product {
            name
            image {
              sourceUrl
            }
          }
          quantity
          total
        }
      }
      billing {
        firstName
        phone
        address1
        company
      }
      customerNote
      databaseId
      shippingLines {
        nodes {
          total
          methodTitle
        }
      }
    }
  }
`
