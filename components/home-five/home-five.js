import s from './home-five.module.scss';
import Link from 'next/link';

const HomeFive = () => (
  <div className={s.wrapper}>
    <div className={s.inner}>
      <img className={s.img1} src="/home/home-five-1.png" />
      <div className={s.text}>
        <div>
          Информация о доставке <br /> и возможность доставки по всему миру!
        </div>
        <Link href="/help#1">
          <a>Узнать подробнее</a>
        </Link>
      </div>
    </div>
    <div className={s.inner}>
      <img className={s.img2} src="/home/home-five-2.png" />
      <div className={s.text}>
        <div>
          Примеряйте одежду с бесплатной <br /> услугой “Магазин на выезд”
        </div>
        <Link href="/help#4">
          <a>Читать про примерку</a>
        </Link>
      </div>
    </div>
    <div className={s.inner}>
      <img className={s.img3} src="/home/home-five-3.png" />
      <div className={s.text}>
        <div>
          Доступна возможность оплаты <br /> товара после доставки
        </div>
        <Link href="/help#3">
          <a>Подробнее об услуге</a>
        </Link>
      </div>
    </div>
  </div>
);
export default HomeFive;
