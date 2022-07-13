import s from './catalog-sale.module.scss';
import CatalogTwo from '../catalog-two';
import { useState, useEffect } from 'react';
import client from '../../apollo/apollo-client';
import { useLazyQuery } from '@apollo/react-hooks';
import PRODUCTS from '../../queries/products';

const CatalogSale = ({ categorySlug, products, pageInfo }) => {
  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS, {
    client,
  });
  const [currentProducts, setCurrentProducts] = useState(products);
  const [currentPageInfo, setCurrentPageInfo] = useState(pageInfo);

  useEffect(() => {
    if (data) {
      setCurrentPageInfo(data.products.pageInfo);
      setCurrentProducts([...currentProducts, ...data.products.nodes]);
    }
  }, [data]);

  const loadMore = () => {
    if (currentPageInfo.hasNextPage) {
      loadProducts({
        variables: {
          first: 8,
          onSale: true,
          after: currentPageInfo.endCursor,
        },
      });
    }
  };

  useEffect(() => {
    setCurrentProducts(products);
    setCurrentPageInfo(pageInfo);
  }, [categorySlug]);

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.breadcumbWrapper}>
            <div className={s.breadcumbInner}>
              <div>Главная {' > '} Скидки</div>
              <div>Найдено {currentProducts.length}</div>
            </div>
          </div>
        </div>
      </div>
      <CatalogTwo
        currentProducts={currentProducts}
        currentPageInfo={currentPageInfo}
        loadMore={loadMore}
        loading={loading}
      />
    </>
  );
};
export default CatalogSale;
