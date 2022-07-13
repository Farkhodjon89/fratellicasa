import s from './product-card-list-catalog.module.scss';
import InfiniteScroll from 'react-infinite-scroller';
import Skeleton from 'react-loading-skeleton';
import ProductCardCatalog from '../product-card-catalog';

const ProductCardListCatalog = ({ currentProducts, currentPageInfo, loadMore, loading }) =>
  loading && !currentProducts.length ? (
    <div className={s.loaderSkeleton}>
      <Skeleton
        width={310}
        height={340}
        count={6}
        className={s.card}
        wrapper={({ children }) => <> {children}</>}
      />
    </div>
  ) : !currentProducts.length ? (
    <div className={s.productsEmpty}>Товары не найдены</div>
  ) : (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={currentPageInfo.hasNextPage}
      initialLoad={false}
      loader={<div className={s.loaderAnimation} key={0} />}>
      <div className={s.loader}>
        <ProductCardCatalog currentProducts={currentProducts} />
      </div>
    </InfiniteScroll>
  );

export default ProductCardListCatalog;
