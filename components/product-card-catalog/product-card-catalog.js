import s from './product-card-catalog.module.scss'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { getPrice, getPriceValue, getDiscount } from '../../utils'

const ProductCardCatalog = ({ currentProducts }) => {
  return currentProducts.map((product) => {
    const discountPrice = getDiscount(product)
    const sizes = product.variations
      ? product.variations.nodes.map(({ attributes, stockQuantity }) => ({
          size: attributes?.nodes.filter((x) => x.name === 'pa_size')[0]?.value,
          stockQuantity,
        }))
      : [
          {
            size: product.attributes?.nodes.filter(
              (x) => x.name === 'Выбранный размер'
            )[0]?.options[0],
            stockQuantity: product.stockQuantity,
          },
        ]

    return (
      <>
        {product.image && (
          <div className={s.card} key={uuidv4()}>
            <Link href={'/product/' + product.slug}>
              <a>
                <img src={product?.image?.sourceUrl} className={s.img} />
              </a>
            </Link>
            <div className={s.body}>
              <div className={s.name}>{product.name}</div>
              <div className={s.price}>
                {product.onSale && discountPrice < 100 ? (
                  <>
                    <span className={s.salePrice}>
                      {getPrice(getPriceValue(product, 'sale'))}
                    </span>
                    <span className={s.normalPrice}>
                      {getPrice(getPriceValue(product))}
                    </span>
                    <span className={s.discountPrice}>
                      Скидка {discountPrice}%
                    </span>
                  </>
                ) : (
                  <span className={s.normalPrice2}>
                    {getPrice(getPriceValue(product))}
                  </span>
                )}
              </div>
              <div className={s.size}>
                <div>В наличии: </div>
                {sizes.map(({ size, stockQuantity }, i) => (
                  <span
                    key={i}
                    className={!stockQuantity ? s.cardSizeDisabled : ''}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    )
  })
}

export default ProductCardCatalog
