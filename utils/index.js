import React, {useContext} from 'react'
import {Context} from '../pages/_app'

export const getPriceValue = (product, sale) => {
  const [state] = useContext(Context)

  let price

  if (state.currency === 'USD') {
    if (sale && product.woocsSalePriceUSD !== 0) {
      price = product.woocsSalePriceUSD
    } else {
      price = product.woocsRegularPriceUSD
    }
  } else {
    if (sale && product.woocsSalePrice !== 0) {
      price = product.woocsSalePrice
    } else {
      price = product.woocsRegularPrice
    }
  }
  return Math.round(price)
}
export const getPrice = (price) => {
  const [state] = useContext(Context)
  const currency = state.currency === 'USD' ? ' $' : ' сум'

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + currency
}

export const getDiscount = (product) => {
  const [state] = useContext(Context)

  let price
  let salePrice

  if (state.currency === 'USD') {
    price = product.woocsRegularPriceUSD
    salePrice = product.woocsSalePriceUSD
  } else {
    price = product.woocsRegularPrice
    salePrice = product.woocsSalePrice
  }
  return Math.round(
      ((parseInt(price) - parseInt(salePrice)) * 100) / parseInt(price)
  )
}
