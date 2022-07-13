import s from './cart-modal.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteFromCart } from '../../redux/actions/cartActions'
import Link from 'next/link'
import { getPrice, getPriceValue, getDiscount } from '../../utils'

const CartModal = ({
  cartItems,
  deleteFromCart,
  activeStatus,
  getActiveStatus,
}) => {
  const myRef = useRef()

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      getActiveStatus ? getActiveStatus(false) : ''
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  let cartTotalPrice = 0

  return (
    <>
      <img
        ref={myRef}
        onClick={() => (getActiveStatus ? getActiveStatus(false) : '')}
        className={`${s.closeCart}  ${activeStatus && s.active2}`}
        src='/product-card/closeCartModal.svg'
        alt=''
      />
      <div ref={myRef} className={`${s.wrapper}  ${activeStatus && s.active}`}>
        {cartItems.length >= 1 ? (
          <>
            <div className={s.top}>
              Товар добавлен <br /> в корзину!
              <img src='/product-card/cartModal.svg' alt='' />
            </div>
            <div className={s.bogBoss}>
              {cartItems.map((product) => {
                cartTotalPrice += product.onSale
                  ? getPriceValue(product, 'sale') * product.quantity
                  : getPriceValue(product) * product.quantity

                return (
                  <div key={uuidv4()} className={s.cartItemList}>
                    <img
                      src={product.selectedProductImage}
                      className={s.img}
                      alt=''
                    />
                    <div className={s.cartItemListInfo}>
                      <div className={s.nameDelete}>
                        <div className={s.name}>{product.name}</div>
                        <img
                          className={s.delete}
                          src='/application/redDelete.svg'
                          onClick={() =>
                            deleteFromCart(product.selectedProductId)
                          }
                        />
                      </div>
                      <div className={s.price}>
                        <span>X{product.quantity} = </span>
                        {product.onSale
                          ? getPrice(getPriceValue(product, 'sale'))
                          : getPrice(getPriceValue(product))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/*<div className={s.bottom}>*/}
            {/*  <div> Доставка </div>*/}
            {/*  <div> 0 сум </div>*/}
            {/*</div>*/}
            <div className={s.bottom}>
              <div> Итого </div>
              <div>{getPrice(cartTotalPrice)}</div>
            </div>
            <button 
              className={s.confrim}
              onClick={() => (getActiveStatus ? getActiveStatus(false) : '')}
            >
              Продолжить покупки
            </button>
            <Link href='/application-cart'>
              <a className={s.link}>
                <img src='/product-card/cartModalLink.svg' alt='' /> Корзина
              </a>
            </Link>
          </>
        ) : (
          <div className={s.empty}>Корзина пуста</div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
