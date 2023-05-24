import s from './application-payment.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { useState, useContext } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getPrice, getPriceValue } from '../../utils'
import sha512 from 'js-sha512'
import { Context } from '../../pages/_app'
import countries from '../application-info/delivery.json'

const ApplicationPayment = ({ cartItems }) => {
  const [state] = useContext(Context)
  const md5 = require('md5')
  const currency = state.currency === 'USD' ? 'USD' : 'UZS'

  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://fratellicasa.com'
      : 'http://localhost:3000'

  const payIcons = [
    {
      src: '/application/payCash.svg',
      title: 'Оплата при доставке',
      value: 'cod',
    },
    // { src: '/application/payClick.svg', title: 'Click', value: 'click' },
    // { src: '/application/payPayMe.svg', title: 'Payme', value: 'payme' },
    { src: '/application/payZoodpay.svg', title: 'Zoodpay', value: 'zoodpay' },
  ]
  const [isLoading, setIsLoading] = useState(false)
  const [selectMethod, setSelectMethod] = useState(
    currency === 'USD' ? 'agruz' : 'cod'
  )
  const [order, setOrder] = useState()
  const [error, setError] = useState()
  const router = useRouter()
  const user = process.browser && JSON.parse(localStorage.getItem('info'))
  const lineItems = []

  const sendCoupon =
    process.browser && JSON.parse(localStorage.getItem('coupon'))

  for (const product of cartItems) {
    lineItems.push({
      product_id: product.databaseId,
      name: product.name,
      price: product.onSale
        ? getPriceValue(product, 'sale').toString()
        : getPriceValue(product).toString(),
      quantity: product.quantity,
      variation_id: product.variations && product.selectedProductId,
      subtotal: product.onSale
        ? (getPriceValue(product, 'sale') * product.quantity).toString()
        : (getPriceValue(product) * product.quantity).toString(),
      total: product.onSale
        ? (getPriceValue(product, 'sale') * product.quantity).toString()
        : (getPriceValue(product) * product.quantity).toString(),
    })
  }

  let couponFront
  let time = ''
  let weight = 0
  let delivery = 0
  let cartTotalPrice = 0

  cartItems.map((product) => {
    product.weight &&
      (weight += (parseInt(product.weight) * product.quantity) / 1000)
    cartTotalPrice += product.onSale
      ? getPriceValue(product, 'sale') * product.quantity
      : getPriceValue(product) * product.quantity
  })

  if (
    sendCoupon &&
    sendCoupon.discountType === 'FIXED_CART' &&
    sendCoupon.amount
  ) {
    cartTotalPrice -= sendCoupon.amount
    couponFront = getPrice(sendCoupon.amount)
  }
  if (
    sendCoupon &&
    sendCoupon.discountType === 'PERCENT' &&
    sendCoupon.amount
  ) {
    const couponSale = Math.round((cartTotalPrice * sendCoupon.amount) / 100)
    cartTotalPrice = cartTotalPrice - couponSale
    couponFront = sendCoupon.amount + '%'
  }

  function inRange(x, min, max) {
    return (x - min) * (x - max) <= 0
  }

  // const productSale = cartItems.find(product => product.onSale)

  if (user?.country === 'Uzbekistan') {
    if (user?.city === 'Toshkent shahri') {
      time = '1-2 дня'
      cartTotalPrice <= 300000 ? (delivery = 20000) : (delivery = 0)
      if (currency === 'USD') {
        cartTotalPrice <= 30 ? (delivery = 2) : (delivery = 0)
      }
    } else {
      time = '3-7 дней после оплаты'
      cartTotalPrice <= 300000 ? (delivery = 30000) : (delivery = 0)
      if (currency === 'USD') {
        cartTotalPrice <= 30 ? (delivery = 3) : (delivery = 0)
      }
    }
  } else {
    const deliveryCountry = countries?.find(
      ({ name }) => name === user?.country
    )
    if (deliveryCountry) {
      if (inRange(weight, 0, 0.25)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n025))
      }
      if (inRange(weight, 0.25, 0.5)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n02505))
      }
      if (inRange(weight, 0.5, 1)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n051))
      }
      if (inRange(weight, 1, 2)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n12))
      }
      if (inRange(weight, 2, 3)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n23))
      }
      if (inRange(weight, 3, 4)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n34))
      }
      if (inRange(weight, 4, 5)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n45))
      }
      if (inRange(weight, 5, 6)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n56))
      }
      if (inRange(weight, 6, 7)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n67))
      }
      if (inRange(weight, 7, 8)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n78))
      }
    }
    time = '7-30 дней после оплаты'
  }

  const sendInfo = async () => {
    setIsLoading(true)

    const orderData = {
      line_items: lineItems,
      set_paid: false,
      status: selectMethod === 'cod' ? 'processing' : 'pending',
      currency: 'USD',
      payment_method: selectMethod,
      total: cartTotalPrice,
      payment_method_title:
        selectMethod === 'cod' ? 'Оплата при доставке' : selectMethod,
      coupon_lines: sendCoupon && [{ code: sendCoupon.code }],
      customer_note: user.comment ? user.comment : '',
      billing: {
        first_name: user.name,
        phone: user.phone,
        address_1: `${user.country} ${user.city} ${user.address}`,
        company: user.feedback,
        email: user.email ? user.email : 'test@gmail.com',
      },
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Доставка курьером',
          total: delivery.toString(),
        },
      ],
    }

    const response = await axios.post('/api/order', { order: orderData })

    if (response.data.status) {
      setOrder(response.data.order)
      switch (selectMethod) {
        case 'cod':
          await window.location.assign(
            `/application-order/${response.data.order.order_key}`
          )
          localStorage.removeItem('persist:nextjs')
          break
        case 'payme':
        case 'click':
        case 'agruz':
          const form = document.querySelector(`#${selectMethod}-form`)
          if (form) {
            form.submit()
          }
          // localStorage.removeItem('persist:nextjs')
          break
        case 'zoodpay':
          axios
            .post('/api/zoodpay', {
              data: {
                customer: {
                  customer_email: response.data.order.billing.email,
                  customer_phone: response.data.order.billing.phone,
                  first_name: response.data.order.billing.first_name,
                  customer_dob: '2000-01-01',
                },
                items: response.data.order.line_items.map(
                  ({ name, price, quantity }) => ({
                    categories: [['test', 'test']],
                    name: name,
                    price: price,
                    quantity: quantity,
                  })
                ),
                order: {
                  amount: parseInt(response.data.order.total).toFixed(2),
                  currency: 'UZS',
                  market_code: 'UZ',
                  merchant_reference_no: response.data.order.id.toString(),
                  service_code: 'ZPI',
                  lang: 'ru',
                  signature: sha512(
                    `Fr@teLli_C@s@|${response.data.order.id}|${response.data.order.total}|UZS|UZ|Xj]3@kQ6`
                  ),
                },
                shipping: {
                  address_line1: response.data.order.billing.address_1,
                  country_code: 'UZB',
                  name: response.data.order.billing.first_name,
                  zipcode: '100000',
                },
              },
            })
            .then((res) => {
              if (res.data.status === 400) {
                setError({
                  message: res.data.message,
                  details: res.data.details,
                })
                setIsLoading(false)
              } else {
                axios.post('/api/transaction', {
                  id: response.data.order.id,
                  transaction_id: res.data.data.transaction_id,
                })
                window.location.assign(res.data.data.payment_url)
                // localStorage.removeItem('persist:nextjs')
              }
            })
          break
        default:
          break
      }
    } else {
      alert(response.data.message)
      router.reload()
    }
  }

  function inRangeZoodpay(x) {
    return (x - 150000) * (x - 5500000) >= 0
  }

  let authKeyPaysys = ''
  const totalPrice = cartTotalPrice + delivery
  const timestamp = Math.floor(new Date().getTime() / 1000)
  if (order) {
    authKeyPaysys = md5(
      'e8bhlCuAjYqZa+Ctrij@O=Wn-UB-OPvT' +
        '101630' +
        order.id.toString() +
        totalPrice.toString() +
        'usd' +
        timestamp
    )
  }

  return (
    <>
      {cartItems.length >= 1 ? (
        <section className={s.wrapper}>
          <form
            id='payme-form'
            method='post'
            action='https://checkout.paycom.uz'
          >
            <input
              type='hidden'
              name='merchant'
              value='60f277b91eea9c5f6d8fa215'
            />
            <input
              type='hidden'
              name='amount'
              value={(cartTotalPrice + delivery) * 100}
            />

            <input
              type='hidden'
              name='account[order_id]'
              value={order && order.id}
            />

            <input type='hidden' name='lang' value='ru' />

            <input
              type='hidden'
              name='callback'
              value={`${host}/application-order/${order && order.order_key}`}
            />
          </form>
          <form
            id='click-form'
            method='get'
            action='https://my.click.uz/services/pay'
          >
            <input type='hidden' name='merchant_id' value='7813' />
            <input
              type='hidden'
              name='transaction_param'
              value={order && order.id}
            />
            <input type='hidden' name='service_id' value='13849' />
            <input
              type='hidden'
              name='amount'
              value={cartTotalPrice + delivery}
            />
            <input
              type='hidden'
              name='return_url'
              value={`${host}/application-order/${order && order.order_key}`}
            />
          </form>
          <form
            id='agruz-form'
            method='post'
            action='https://paysys.uz/pay-universal/FratelliCasa'
          >
            <input type='hidden' name='VENDOR_ID' value={101630} />
            <input
              type='hidden'
              name='MERCHANT_TRANS_ID'
              value={order && order.id}
            />
            <input
              type='hidden'
              name='MERCHANT_TRANS_AMOUNT'
              value={cartTotalPrice + delivery}
            />
            <input type='hidden' name='MERCHANT_CURRENCY' value='usd' />
            <input
              type='hidden'
              name='MERCHANT_TRANS_NOTE'
              value='Описание услуги'
            />
            <input type='hidden' name='SIGN_TIME' value={timestamp} />
            <input type='hidden' name='SIGN_STRING' value={authKeyPaysys} />
          </form>
          <div className={s.paymentMethod}>
            <div className={s.title}>Выберите метод оплаты</div>
            <div className={s.payList}>
              {currency === 'USD' ? (
                <>
                  <img
                    src='/application/octo.svg'
                    key='agruz'
                    className={s.octoIcon}
                    onClick={() => setSelectMethod('agruz')}
                  />
                  <img
                    src='/application/mir.jpeg'
                    key='agruz'
                    className={s.octoIcon2}
                    onClick={() => setSelectMethod('agruz')}
                  />
                </>
              ) : (
                payIcons.map(({ src, value }) => (
                  <img
                    src={src}
                    key={uuidv4()}
                    className={`${selectMethod === value ? s.active : ''} ${
                      value === 'zoodpay' &&
                      inRangeZoodpay(parseInt(cartTotalPrice))
                        ? s.zoodpayy
                        : ''
                    } ${
                      user.city !== 'Toshkent shahri' && value === 'cod'
                        ? s.removeCod
                        : ''
                    } `}
                    onClick={() => setSelectMethod(value)}
                  />
                ))
              )}
            </div>
            {selectMethod === 'zoodpay' && !user.email && (
              <div className={s.text} style={{ color: 'red' }}>
                При выборе Zoodpay Email обязателен
                <Link href='/application-info'>
                  <a
                    style={{
                      fontWeight: 'bold',
                      textDecoration: 'underline !important',
                      marginLeft: '10px',
                    }}
                  >
                    Заполнить Email
                  </a>
                </Link>
              </div>
            )}
            {currency !== 'USD' && (
              <>
                <div className={s.text}>
                  <img src='/application/warning2.svg' alt='' />
                  {user.city === 'Toshkent shahri'
                    ? 'Оплата после доставки возможна следующими методами: наличные'
                    : 'В регионы Узбекистана действует 100% предоплата '}
                </div>
                <div className={s.textZoodpay}>
                  Zoodpay - покупка товара в рассрочку в 4 платежа.
                  <br />
                  Минимальная сумма - 150 000 сум.
                  <br />
                  Максимальная сумма - 5 500 000 сум.
                </div>
              </>
            )}
            <button
              onClick={sendInfo}
              disabled={
                isLoading || (selectMethod === 'zoodpay' && !user.email)
              }
            >
              {isLoading ? (
                <div className={s.loaderAnimation} />
              ) : (
                <div className={s.lastCheck}>
                  Завершить заказ
                  <img src='/application/next.svg' alt='' />
                </div>
              )}
            </button>
          </div>
          <div className={s.cart}>
            {cartItems.length >= 1 ? (
              <div className={s.cartBlock}>
                {cartItems.map((product) => {
                  return (
                    <div key={uuidv4()} className={s.cartItemList}>
                      <img src={product.selectedProductImage} alt='' />
                      <div>
                        <div className={s.cartName}>{product.name}</div>
                        <span className={s.cartPrice}>
                          {product.onSale
                            ? getPrice(getPriceValue(product, 'sale'))
                            : getPrice(getPriceValue(product))}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            <div className={s.finalCheckRow}>
              <div className={s.finalCheck}>
                <div>Время</div>
                <div className={s.delivery}>{time}</div>
              </div>
              <div className={s.finalCheck}>
                <div className={s.deliveryText}>Доставка</div>
                <div className={s.delivery}>{getPrice(delivery)}</div>
              </div>
              <div className={s.finalCheck}>
                <div> Купон</div>
                <div>{couponFront || '0 сум'}</div>
              </div>
              <div className={s.finalCheck}>
                <div>Подытог</div>
                <div>{cartTotalPrice ? getPrice(cartTotalPrice) : '0 сум'}</div>
              </div>
              <div className={s.finalCheck}>
                <div>Итого</div>
                <div>
                  {cartTotalPrice
                    ? getPrice(cartTotalPrice + delivery)
                    : '0 сум'}
                </div>
              </div>
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
              <Link href='/help#3'>
                <a>
                  <img src='/header/payment.svg' alt='' />
                  <span>Возможность оплаты после доставки</span>
                </a>
              </Link>
              <Link href='/help#2'>
                <a>
                  <img src='/product-card/return.svg' alt='' />
                  <span>Гарантия на обмен или возврат товара</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div className={s.emptyCart}>
          Корзина пуста
          <Link href='/catalog/zhenskaya'>
            <a>Начать покупки</a>
          </Link>
        </div>
      )}
    </>
  )
}

export default ApplicationPayment
