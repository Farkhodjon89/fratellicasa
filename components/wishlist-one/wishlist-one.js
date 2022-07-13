import s from './wishlist-one.module.scss'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'

const WishlistOne = ({ wishlistItems, deleteFromWishlist }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.title}>Избранные</div>
        {wishlistItems.length >= 1 ? (
          wishlistItems.map((product) => (
            <div key={uuidv4()} className={s.cartItemList}>
              <img className={s.img} src={product?.image?.sourceUrl} />
              <div className={s.cartName}>{product.name}</div>
              <Link href={'/product/' + product.slug}>
                <a>Посмотреть</a>
              </Link>
              <button onClick={() => deleteFromWishlist(product)}>
                <img src='/application/redDelete.svg' alt='' />
              </button>
            </div>
          ))
        ) : (
          <div className={s.empty}>
            Пусто
            <Link href='/catalog/zhenskaya'>
              <a>Начать покупки</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistOne
