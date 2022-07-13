import s from './home-four.module.scss'
import ProductCardListMain from '../product-card-list-main'

const HomeFour = ({ products }) => (
  <div className={s.wrapper}>
    <div className={s.inner}>
      <div className={s.list}>
        <ProductCardListMain products={products} />
      </div>
    </div>
  </div>
)
export default HomeFour
