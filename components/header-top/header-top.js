import s from './header-top.module.scss';
import Slider from 'react-slick';
import Link from 'next/link';

const HeaderTop = () => (
  <section className={s.wrapper}>
    <div className={s.inner}>
      <div className={s.iconsDesk}>
         <div>
          <img src="/header/delivery.svg" />
          <span>Бесплатная доставка от 300 тыс. сумов</span>
        </div>
        <div>
          <img src="/header/fitting.svg" />
          <span>Бесплатная примерка</span>
        </div>
        <div>
          <img src="/header/payment.svg" />
          <span>Оплата после доставки</span>
        </div>
      </div>
      <Slider
        infinite
        autoplay
        speed={1000}
        vertical
        arrows={false}
        cssEase="linear"
        className={s.iconsMob}>
         <div className={s.iconsMobChild}>
          <img src="/header/delivery.svg" className={s.iconsMobImg1} />
          <span>Бесплатная доставка от 300 тыс. сумов</span>
        </div>
        <div className={s.iconsMobChild}>
          <img src="/header/fitting.svg" className={s.iconsMobImg2} />
          <span>Бесплатная примерка</span>
        </div>
        <div className={s.iconsMobChild}>
          <img src="/header/payment.svg" className={s.iconsMobImg3} />
          <span>Оплата после доставки</span>
        </div>
      </Slider>




      <Link href="https://t.me/fratellicasa_uz" target="_blank">

        <a>
          <img src="/header/telegram.svg" />
          <span>Написать</span>
        </a>
      </Link>

      <Link href="tel:+998909029419">
        <a>
          <img src="/header/phone.svg" />
          <span>Позвонить</span>
        </a>
      </Link>
    </div>
  </section>
);
export default HeaderTop;
