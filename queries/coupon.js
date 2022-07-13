import gql from 'graphql-tag'

export const COUPON = gql`
  query Coupon($id: ID!) {
    coupon(id: $id, idType: CODE) {
      code
      discountType
      amount
    }
  }
`
