import s from './product-card.module.scss'
import ImageGallery from 'react-image-gallery'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SizeGrid from '../size-grid'
import { getPrice, getPriceValue, getDiscount } from '../../utils'

const ProductCard = ({
  product,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  getActiveStatus,
  topColors,
}) => {
  // general
  const [selectedProductId, setselectedProductId] = useState(
    product.variations
      ? product.variations.nodes[0].databaseId
      : product.databaseId
  )
  const quantityCount = 1
  // product card images
  const [selectedProductImage, setSelectedProductImage] = useState(
    product.variations
      ? product.variations.nodes[0]?.image?.sourceUrl
      : product.image?.sourceUrl
  )

  const galleryImages = product.galleryImages.nodes.map(({ sourceUrl }) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }))
  const images = [
    {
      original: selectedProductImage,
      thumbnail: selectedProductImage,
    },
    ...galleryImages,
  ]
  const [windowWidth, setWindowWidth] = useState()
  const resizeWindow = () => {
    setWindowWidth(window.screen.width)
  }
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  // product breadcrumb and category
  let productBreadcrumb
  let productCategory

  product.productCategory.nodes.map(({ name }) => {
    if (name === 'Женская' || name === 'Мужская' || name === 'Девочкам') {
      return (productBreadcrumb = name)
    }
    productCategory = ![
      'Uncategorized',
      'Женская',
      'Мужская',
      'Девочкам',
    ].includes(name)
      ? name
      : ''
  })

  const discountPrice = getDiscount(product)

  // product color
  const [selectedProductColorCode, setSelectedProductColorCode] = useState(
    product.variations
      ? product?.variations?.nodes[0]?.attributes?.nodes[0].color
      : product.terms.nodes && product.terms.nodes[0]
      ? product.terms.nodes[0].color
      : ''
  )
  const [selectedProductColorName, setSelectedProductColorName] = useState(
    product.variations
      ? product?.variations?.nodes[0]?.attributes?.nodes[0].value
      : product.terms && product.terms.nodes[0]
      ? product.terms.nodes[0].name
      : ''
  )
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variations
      ? product?.variations?.nodes[0]?.attributes?.nodes[0].value
      : product?.attributes?.nodes[0]?.options?.length &&
          product?.attributes?.nodes[0]?.options[0]
  )

  // product size
  const [selectedProductSize, setSelectedProductSize] = useState()

  // size grid modal
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  // add to cart and wishlist
  const cartItem = cartItems.filter(
    (cartItem) => cartItem.selectedProductId === selectedProductId
  )[0]

  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0]

  const addToCartOpenCart = () => {
    addToCart(
      product,
      quantityCount,
      selectedProductColor,
      selectedProductSize,
      selectedProductColorCode,
      selectedProductImage,
      selectedProductId
    )
    getActiveStatus(true)

    process.env.NODE_ENV === 'production' &&
      fbq('track', 'AddToCart', {
        value: product.onSale
          ? product.woocsSalePrice
          : product.woocsRegularPrice,
      })
  }

  // function getUniqueListBy(arr, key) {
  //   return [...new Map(arr.map((item) => [item[key], item])).values()]
  // }

  // const colorOne =
  //   product.variations &&
  //   product.variations.nodes.map(
  //     ({ attributes, databaseId, image, stockQuantity }) => ({
  //       colorName: attributes.nodes[0].value,
  //       colorCode: attributes.nodes[0].color,
  //       sizeName: attributes.nodes[1].value,
  //       databaseId: databaseId,
  //       image: image,
  //       stockQuantity: stockQuantity,
  //     })
  //   )

  // const colorTwo = product.variations && getUniqueListBy(colorOne, 'colorName')
  // const sizeTwo = product.variations && getUniqueListBy(colorOne, 'sizeName')

  // const joki =
  //   product.variations &&
  //   product.variations.nodes.map((product) =>
  //     product.attributes.nodes[0].value === selectedProductColor &&
  //     product.stockQuantity
  //       ? product.attributes.nodes[1].value
  //       : false
  //   )

  let sizes = product.variations
    ? product.variations.nodes.map(
        ({ attributes, stockQuantity, databaseId }) => ({
          size: attributes?.nodes.filter((x) => x.name === 'pa_size')[0]?.value,
          stockQuantity: stockQuantity,
          databaseId: databaseId,
        })
      )
    : [
        {
          size: product.attributes?.nodes.filter(
            (x) => x.name === 'Выбранный размер'
          )[0]?.options[0],
          stockQuantity: product.stockQuantity,
          databaseId: product.databaseId,
        },
      ]

  const ORDER = [
    'one size',
    'xxs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    'xxl',
  ]

  sizes.sort((a, b) => {
    a.size = a.size.toLowerCase()
    b.size = b.size.toLowerCase()

    let nra = parseInt(a.size)
    let nrb = parseInt(b.size)

    if (ORDER.indexOf(a.size) != -1) nra = NaN
    if (ORDER.indexOf(b.size) != -1) nrb = NaN

    if (nrb === 0) return 1
    if ((nra && !nrb) || nra === 0) return -1
    if (!nra && nrb) return 1
    if (nra && nrb) {
      if (nra == nrb) {
        return a.size
          .substr(('' + nra).length)
          .localeCompare(a.size.substr(('' + nra).length))
      } else {
        return nra - nrb
      }
    } else {
      return ORDER.indexOf(a.size) - ORDER.indexOf(b.size)
    }
  })

  return (
    <>
      <div className={s.top}>
        <div className={s.topInner}>
          Главная {'>'} {productBreadcrumb} {'>'} {product.name}
        </div>
      </div>
      <div className={s.wrapper}>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          autoPlay={false}
          thumbnailPosition={windowWidth >= 1023 ? 'right' : 'bottom'}
        />
        <div className={s.details}>
          <div className={s.vendorCode}>{product.sku}</div>
          <div className={s.category}>{productCategory}</div>
          <div className={s.name}>{product.name}</div>
          <div
            className={s.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className={s.price}>
            {product.onSale && discountPrice < 100 ? (
              <>
                <span className={s.salePrice}>
                  {getPrice(getPriceValue(product, 'sale'))}
                </span>
                <span className={s.comboPrice}>
                  <span className={s.normalPrice}>
                    {getPrice(getPriceValue(product))}
                  </span>
                  <span className={s.discountPrice}>-{discountPrice}%</span>
                </span>
              </>
            ) : (
              <span className={s.salePrice}>
                {getPrice(getPriceValue(product))}
              </span>
            )}
          </div>

          {/* <div className={s.couponText}>some dummy text</div> */}

          {product.variations ? (
            <>
              {product?.variations?.nodes[0]?.attributes?.nodes[1] ? (
                <div className={s.color} key={uuidv4()}>
                  <span>Цвет: {selectedProductColorName} </span>
                  <div>
                    {topColors.length != 0 &&
                      topColors.map(({ slug, paColors }) => (
                        <div
                          key={uuidv4()}
                          className={product.slug == slug && s.active}
                        >
                          <Link href={'/product/' + slug}>
                            <a
                              style={{
                                backgroundColor: paColors?.nodes[0]?.color
                                  ? paColors?.nodes[0]?.color
                                  : '',
                              }}
                            ></a>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                ''
              )}

              {product?.variations?.nodes[0]?.attributes?.nodes[1] ? (
                <div className={s.size} key={uuidv4()}>
                  <span>Размер: </span>
                  <div>
                    {sizes.map(({ size, stockQuantity, databaseId }, index) => (
                      <button
                        key={uuidv4()}
                        className={` ${
                          selectedProductSize === size ? s.active : ''
                        } ${!stockQuantity ? s.outOfStock : ''}`}
                        disabled={!stockQuantity}
                        onClick={() => {
                          setSelectedProductSize(size)
                          setselectedProductId(databaseId)
                        }}
                      >
                        {size}
                      </button>
                    ))}
                    {/* {sizeTwo.map(
                      ({
                        colorName,
                        colorCode,
                        stockQuantity,
                        databaseId,
                        sizeName,
                      }) => (
                        <button
                          key={uuidv4()}
                          className={`${
                            selectedProductSize === sizeName ? s.active : ''
                          } ${!joki.includes(sizeName) ? s.outOfStock : ''} `}
                          onClick={() => {
                            setSelectedProductSize(sizeName)
                            setselectedProductId(databaseId)
                            setSelectedProductSize(sizeName)
                            setselectedProductStock(stockQuantity)
                          }}
                          disabled={!joki.includes(sizeName)}
                        >
                          {sizeName}
                        </button>
                      )
                    )} */}
                  </div>
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            <>
              {product.attributes && product.attributes.nodes[0] ? (
                <div className={s.color}>
                  <span>Цвет: {selectedProductColorName} </span>
                  <div>
                    <div
                      className={
                        selectedProductColor ===
                        product?.attributes?.nodes[0]?.options
                          ? product?.attributes?.nodes[0]?.options[0]
                          : false
                          ? s.active
                          : ''
                      }
                    >
                      <button
                        key={uuidv4()}
                        style={{
                          backgroundColor: product.terms.nodes[0]
                            ? product.terms.nodes[0].color
                            : '',
                        }}
                        onClick={() => {
                          setSelectedProductColorName(
                            product.terms.nodes[0].name
                          )
                          setSelectedProductColorCode(
                            product.terms.nodes[0].color
                          )
                          setSelectedProductColor(
                            product?.attributes?.nodes[0]?.options
                              ? product?.attributes?.nodes[0]?.options[0]
                              : ''
                          )
                          setSelectedProductSize(
                            product.attributes.nodes[1].options[0]
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {product.attributes && product.attributes.nodes[2] ? (
                <div className={s.size}>
                  <span>Размер: </span>
                  <div>
                    <button
                      key={uuidv4()}
                      className={
                        selectedProductSize ===
                        product.attributes.nodes[1].options[0]
                          ? s.active
                          : ''
                      }
                      onClick={() => {
                        setSelectedProductColorName(product.terms.nodes[0].name)
                        setSelectedProductColorCode(
                          product.terms.nodes[0].color
                        )
                        setSelectedProductColor(
                          product.attributes.nodes[0].options[0]
                        )
                        setSelectedProductSize(
                          product.attributes.nodes[1].options[0]
                        )
                      }}
                    >
                      {product.attributes.nodes[1].options[0]}
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
            </>
          )}
          <button className={s.properSize} onClick={() => setOpen(true)}>
            <img src='/catalog/size.svg' />
            Найти подходящий размер
          </button>
          {product.variations && (
            <SizeGrid
              activeStatus={open}
              getActiveStatus={setOpen}
              product={product}
            />
          )}
          <div className={s.actions}>
            <button
              className={`${s.actionAddToCart} ${
                cartItem || !selectedProductSize ? s.active : ''
              }`}
              onClick={
                cartItem
                  ? () => deleteFromCart(selectedProductId)
                  : () => addToCartOpenCart()
              }
              disabled={!selectedProductSize}
            >
              {!selectedProductSize
                ? 'Выберите размер'
                : cartItem
                ? 'Уже в корзине'
                : 'Добавить в корзину'}
            </button>
            <button
              className={`${s.actionAddToWishlist} ${
                wishlistItem !== undefined ? s.active : ''
              }`}
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product)
                  : () => addToWishlist(product)
              }
            >
              <img src='/header/like.svg' />
            </button>
          </div>
          <div className={s.offer}>
            <Link href='/help#1'>
              <a>
                <img src='/product-card/delivery.svg' alt='' />
                <span>Информация о доставке</span>
              </a>
            </Link>
            <Link href='/help#5'>
              <a>
                <img src='/product-card/wear.svg' alt='' />
                <span>Бесплатная примерка одежды дома</span>
              </a>
            </Link>
            <Link href='/help#2'>
              <a>
                <img src='/product-card/return.svg' alt='' />
                <span>Гарантия на обмен или возврат товара</span>
              </a>
            </Link>

            <Link href='https://t.me/fratellicasa_uz'>
              <a>
                <img src='/product-card/tg.svg' alt='' />
                <span className={s.lastTg}>
                  Написать консультанту в Telegram
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProductCard
