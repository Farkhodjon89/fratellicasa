import s from './wrapper-application.module.scss'
import { useRouter } from 'next/router'

const WrapperApplication = ({ children, order }) => {
  const orderKey = order && order.orderKey
  const links = [
    { url: '/application-cart', name: 'Корзина' },
    { url: '/application-info', name: 'Ваши данные' },
    { url: '/application-payment', name: 'Оплата' },
    { url: '/application-order/' + orderKey, name: 'Заказ принят' }
  ]
  const router = useRouter()

  return (
    <section className={s.wrapper}>
      <div className={s.navTabs}>
        {links.map(({ url, name }, i) => {
          return (
            <div key={i} className={` ${s.navItem} ${router.pathname === url ? s.active : null}`}>
              {name}
            </div>
          )
        })}
      </div>
      {children}
    </section>
  )
}
export default WrapperApplication
