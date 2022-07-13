import Link from 'next/link';
import s from './product-details.module.scss';

const ProductDetails = ({ materialName, product }) => {
  let productCategory;

  product.productCategory.nodes.map(({ name }) => {
    productCategory = ['Куртки'].includes(name)
      ? 'Химчистка рекомендуется'
      : `Изделие рекомендуется стирать в стиральной машине в режиме теплой воды
    в течение не более 40 минут. После отжима в стиральной машине
    рекомендуется просушить изделие до конца на специальной сушке. Ручная
    стирка не рекомендуется.`;
  });

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <img src="/product-card/material.svg" />
        <div className={s.title}>Материал</div>
        <div className={s.text}>{materialName}</div>
      </div>
      <div className={s.inner}>
        <img src="/product-card/cleaning.svg" />
        <div className={s.title}>Уход и стирка</div>
        <div className={s.text}>{productCategory}</div>
      </div>
      <div className={s.inner}>
        <img src="/product-card/buy.svg" />
        <div className={s.title}>Как купить?</div>
        <div className={s.text}>
          1. Выберите количество и цвет товара
          <br />
          2. Выберите размер, в случае возникновения проблем с подбором размера, воспользуйте
          размерной сеткой
          <br />
          3. Нажмите на кнопку “Добавить в корзину”
          <br />
          4. В случае возникновения проблем, напишите нам в телеграм
          <Link href="/">
            <a>(перейти в телеграм)</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
