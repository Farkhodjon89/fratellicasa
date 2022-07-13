import s from './application-cart.module.scss'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import ProductCardListMain from '../../components/product-card-list-main'
import { getPrice, getPriceValue, getDiscount } from '../../utils'
import client from '../../apollo/apollo-client'
import { useLazyQuery } from '@apollo/react-hooks'
import { COUPON } from '../../queries/coupon'
import { useEffect, useState, useContext } from 'react'
import {Context} from '../../pages/_app'

const ApplicationCart = ({
  cartItems,
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  products,
}) => {
  
 
  const [loadCupon, { data, loading }] = useLazyQuery(COUPON, {
    client,
  })
  const [name, setName] = useState('')
  const [wrong, setWrong] = useState(false)
  const [myCoupon, setMyCoupon] = useState(
    process.browser && JSON.parse(localStorage.getItem('coupon'))
  )
  const sendCupon = () => {
    loadCupon({
      variables: {
        id: name,
      },
    })
  }

  useEffect(() => {
    if (data && data.coupon) {
      localStorage.setItem('coupon', JSON.stringify(data.coupon))
      setMyCoupon(JSON.parse(localStorage.getItem('coupon')))
    }
  }, [data])

  useEffect(() => {
    if (data && !data.coupon) {
      setWrong(true)
    }
  }, [data])

  let couponFront
  let cartTotalPrice = 0
  let economy = 0
  let withoutSale = 0

  cartItems.map((product) => {
    cartTotalPrice += product.onSale
      ? getPriceValue(product, 'sale') * product.quantity
      : getPriceValue(product) * product.quantity
    economy += product.onSale
      ? getPriceValue(product) * product.quantity -
        getPriceValue(product, 'sale') * product.quantity
      : 0
    withoutSale += getPriceValue(product) * product.quantity
  })

  if (myCoupon && myCoupon.discountType === 'FIXED_CART' && myCoupon.amount) {
    cartTotalPrice -= myCoupon.amount
    couponFront = getPrice(myCoupon.amount)
  }
  if (myCoupon && myCoupon.discountType === 'PERCENT' && myCoupon.amount) {
    const couponSale = Math.round((cartTotalPrice * myCoupon.amount) / 100)
    cartTotalPrice = cartTotalPrice - couponSale
    couponFront = myCoupon.amount + '%'
  }

  return (
    <>
      {cartItems.length >= 1 ? (
        <div className={s.wrapper}>
          <div className={s.left}>
            {loading ? (
              <div className={s.loaderAnimation} />
            ) : myCoupon ? (
              <div className={s.couponActivated}>
                Купон <div>{myCoupon.code}</div> активирован
                <button
                  onClick={() => {
                    setMyCoupon(localStorage.removeItem('coupon'))
                    setWrong(false)
                    setName('')
                  }}
                >
                  Удалить
                </button>
              </div>
            ) : (
              <>
                {wrong ? (
                  <div className={s.wrongName}>
                    Купон не существует. Пожалуйста проверьте и попробуйте
                    ввести заново
                  </div>
                ) : (
                  ''
                )}
                <div className={s.coupon}>
                  <span>
                    <img src='/application/coupon.svg' alt='' />
                    <input
                      type='text'
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Введите код-ваучера'
                    />
                  </span>
                  <button type='submit' onClick={sendCupon}>
                    Применить
                  </button>
                </div>
              </>
            )}
            <div className={s.priceList}>
              <div className={s.text}> Сумма без скидки</div>
              <div className={s.number}>{getPrice(withoutSale)}</div>
            </div>
            <div className={s.priceList}>
              <div className={s.text}> Купон</div>
              <div className={s.number}>{couponFront || '0 сум'}</div>
            </div>
            <div className={s.priceList}>
              <div className={s.text}> Скидка</div>
              <div className={s.number}>{getPrice(economy)}</div>
            </div>
            {/*<div className={s.priceList}>*/}
            {/*  <div className={s.text}> Доставка</div>*/}
            {/*  <div className={s.number}> 0 сум</div>*/}
            {/*</div>*/}

            <div className={`${s.priceList}  ${s.lastHero} `}>
              <div className={s.text}>ИТОГО</div>
              <div className={s.number}>{getPrice(cartTotalPrice)}</div>
            </div>
            <Link href='/application-info'>
              <a>
                Продолжить <img src='/application/next.svg' alt='' />
              </a>
            </Link>
          </div>
          <div className={s.right}>
            {cartItems.map((product) => {
              let productCategory

              product.productCategory.nodes.map(({ name }) => {
                productCategory = ![
                  'Uncategorized',
                  'Женская',
                  'Мужская',
                ].includes(name)
                  ? name
                  : ''
              })

              return (
                <div key={uuidv4()} className={s.cartItemList}>
                  <img
                    src={product.selectedProductImage}
                    className={s.img}
                    alt=''
                  />
                  <div className={s.cartItemListInfo}>
                    <div className={s.categoryDelete}>
                      <div>{productCategory}</div>
                      <img
                        className={s.delete}
                        src='/application/delete.svg'
                        onClick={() =>
                          deleteFromCart(product.selectedProductId)
                        }
                      />
                    </div>
                    <div className={s.name}>{product.name}</div>

                    <span className={s.price}>
                      {product.onSale
                        ? getPrice(getPriceValue(product, 'sale'))
                        : getPrice(getPriceValue(product))}
                    </span>
                    <div className={s.detailsMob}>
                      {product.selectedProductColorCode ? (
                        <div
                          className={s.color}
                          style={{
                            backgroundColor: product.selectedProductColorCode,
                          }}
                        />
                      ) : (
                        ''
                      )}

                      {product.selectedProductSize ? (
                        <div className={s.size}>
                          {product.selectedProductSize}
                        </div>
                      ) : (
                        ''
                      )}
                      <div className={s.quantity}>
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              product.selectedProductId,
                              product.quantity
                            )
                          }
                        >
                          -
                        </button>
                        <input type='text' value={product.quantity} readOnly />
                        <button
                          onClick={() => addToCart(product)}
                          disabled={
                            product !== undefined &&
                            product.quantity &&
                            product.quantity >=
                              cartItemStock(
                                product,
                                product.selectedProductColor,
                                product.selectedProductSize
                              )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className={s.lastInfo}>
                      <div className={s.details}>
                        {product.selectedProductColorCode ? (
                          <div
                            className={s.color}
                            style={{
                              backgroundColor: product.selectedProductColorCode,
                            }}
                          />
                        ) : (
                          ''
                        )}

                        {product.selectedProductSize ? (
                          <div className={s.size}>
                            {product.selectedProductSize}
                          </div>
                        ) : (
                          ''
                        )}
                        <div className={s.quantity}>
                          <button
                            onClick={() =>
                              decreaseQuantity(
                                product.selectedProductId,
                                product.quantity
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type='text'
                            value={product.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => addToCart(product)}
                            disabled={
                              product !== undefined &&
                              product.quantity &&
                              product.quantity >=
                                cartItemStock(
                                  product,
                                  product.selectedProductColor,
                                  product.selectedProductSize
                                )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div
                        className={s.deleteMob}
                        onClick={() =>
                          deleteFromCart(product.selectedProductId)
                        }
                      >
                        <img src='/application/redDelete.svg' alt='' />
                        Удалить
                      </div>
                      <Link href={'/product/' + product.slug}>
                        <a>Изменить</a>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className={s.emptyCart}>
          Корзина пуста
          <Link href='/catalog/zhenskaya'>
            <a>Начать покупки</a>
          </Link>
        </div>
      )}
      <div className={s.offer}>
        <img src='/application/warning2.svg'/>
        <div className={s.extraData}>
          При покупке на сумму свыше 300,000 действует бесплатная доставка.
        </div>
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
        <Link href='/help'>
          <a>
            <img src='/product-card/tg.svg' alt='' />
            <span className={s.lastTg}>Написать консультанту в Telegram</span>
          </a>
        </Link>
      </div>
      <div className='recommend'>Fratelli Casa рекомендует</div>
      <ProductCardListMain products={products} />
    </>
  )
}

export default ApplicationCart
