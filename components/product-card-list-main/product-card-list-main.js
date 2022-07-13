import s from './product-card-list-main.module.scss';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { getPrice, getPriceValue, getDiscount } from '../../utils';

const ProductCardListMain = ({ products }) => {
  const cardList = products.map((product) => {
    const discountPrice = getDiscount(product);
    return (
      <div className={s.card} key={uuidv4()}>
        <Link href={'/product/' + product.slug}>
          <a>
            <img src={product.image?.sourceUrl} className={s.img} />
          </a>
        </Link>
        <div className={s.body}>
          <div className={s.name}>{product.name}</div>
          <div className={s.price}>
            {product.onSale ? (
              <>
                <span className={s.salePrice}>{getPrice(getPriceValue(product, 'sale'))}</span>
                <span className={s.normalPrice}>{getPrice(getPriceValue(product))}</span>
                <span className={s.discountPrice}>Скидка {discountPrice}%</span>
              </>
            ) : (
              <span className={s.normalPrice2}>{getPrice(getPriceValue(product))}</span>
            )}
          </div>
          <Link href={'/product/' + product.slug} className={s.buy}>
            <a>Купить</a>
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className={s.wrapper}>
      <div className={s.list}>{cardList}</div>
    </div>
  );
};
export default ProductCardListMain;
