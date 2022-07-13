import s from './application-order.module.scss';
import {v4 as uuidv4} from 'uuid';
import {getPrice} from '../../utils';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
// import { Link } from 'react-router-dom';


const ApplicationOrder = ({order}) => {
  // console.log(order)

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('persist:nextjs')) {
      localStorage.removeItem('persist:nextjs');
      router.reload();
      process.env.NODE_ENV === 'production' &&
      fbq('track', 'Purchase', {
        value: parseInt(order.total),
        currency: 'UZS',
      });
    } else {
      process.env.NODE_ENV === 'production' &&
      fbq('track', 'Purchase', {
        value: parseInt(order.total),
        currency: 'UZS',
      });
      return;
    }
  }, []);

  return (
      <section className={s.wrapper}>
        <div className={s.top}>
          <div>Благодарим за покупку! Наш консультант выйдет на связь с вами в ближайшее время.</div>
          {/* <Link href=''>
        <a>Следите за статусом покупки онлайн</a>
      </Link> */}
        </div>
        <div className={s.cartList}>
          {order.lineItems.nodes.map(({product, total}) => {
            return (
                <div key={uuidv4()} className={s.cartItemList}>
                  <img src={product.image?.sourceUrl} alt=""/>
                  <div className={s.namePrice}>
                    <div className={s.cartName}>{product.name}</div>
                    <span className={s.cartPrice}>{getPrice(total)}</span>
                  </div>
                </div>
            );
          })}
        </div>
        <div className={s.bottom}>
          <div className={s.left}>
            <div className={s.row}>
              <div className={s.text}>Номер заказа</div>
              <div className={s.desc}>{order.databaseId}</div>
            </div>
            <div className={s.row}>
              <div className={s.text}>Метод оплаты</div>
              <div className={s.desc}>{order.paymentMethodTitle}</div>
            </div>
            <div className={s.row}>
              <div className={s.text}>Дата покупки</div>
              <div className={s.desc}>{new Date(order.date).toLocaleDateString()}</div>
            </div>
            <div className={s.row}>
              <div className={s.text}>Доставка</div>
              <div className={s.desc}>
                {getPrice(
                    order.shippingLines?.nodes[0]?.total ? order.shippingLines?.nodes[0]?.total : 0,
                )}
              </div>
            </div>
            <div className={s.row}>
              <div className={s.text}>ИТОГО</div>
              <div className={s.desc}>{getPrice(order.total)}</div>
            </div>
          </div>
          <div className={s.right}>
            <div className={s.rightInner}>
              <div className={s.row}>
                <div className={s.text}>Статус</div>
                <div className={s.desc}>В обработке, ждите звонка оператора</div>
              </div>
              <div className={s.row}>
                <div className={s.text}>Имя и Фамилия</div>
                <div className={s.desc}>{order.billing.firstName}</div>
              </div>
              <div className={s.row}>
                <div className={s.text}>Номер телефона</div>
                <div className={s.desc}>{order.billing.phone}</div>
              </div>
              <div className={s.row}>
                <div className={s.text}>Адрес</div>
                <div className={s.desc}>{order.billing.address1}</div>
              </div>
            </div>
            <Link href="/">
              <a>
                <button>Продолжить покупки</button>
              </a>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default ApplicationOrder;

