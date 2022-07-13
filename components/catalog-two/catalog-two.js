import s from './catalog-two.module.scss'
import ProductCardListCatalog from '../product-card-list-catalog'
import { v4 as uuidv4 } from 'uuid'

const CatalogTwo = ({ currentProducts, currentPageInfo, loadMore, loading }) => (
  <section className={s.wrapper}>
    <div className={s.inner}>
      <ProductCardListCatalog
        currentProducts={currentProducts}
        currentPageInfo={currentPageInfo}
        loadMore={loadMore}
        loading={loading}
      />
    </div>
  </section>
)
export default CatalogTwo
