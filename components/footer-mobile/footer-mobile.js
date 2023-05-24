import s from './footer-mobile.module.scss'
import Link from 'next/link'

const FooterMobile = () => (
  <section className={s.wrapper}>
    <div className={s.icons}>
      <Link href='https://t.me/fc_uz'>
        <a>
          <img src='/footer/telegram.svg' />
        </a>
      </Link>

      <Link href='https://www.facebook.com/fratellicasa/'>
        <a>
          <img src='/footer/facebook.svg' />
        </a>
      </Link>

      <Link href='https://www.instagram.com/fratellicasa_uz/'>
        <a>
          <img src='/footer/instagram.svg' />
        </a>
      </Link>

      <Link href='tel:+998909029419'>
        <a>
          <img src='/footer/phone.svg' />
        </a>
      </Link>
    </div>
    <div className={s.line} />
    <div className={s.logoFollowSubscribe}>
      <img src='/footer/logo-mobile.svg' />
      <div>Следите за нами в Instagram</div>
      <div>
        <Link href='https://www.instagram.com/fratellicasa_uz/'>
          <a>Подписаться</a>
        </Link>
      </div>
    </div>
    <div className={s.images}>
      <img src='/footer/img1.webp' />
      <img src='/footer/img2.webp' />
      <img src='/footer/img3.webp' />
      <img src='/footer/img4.webp' />
      <img src='/footer/img5.webp' />
      <img src='/footer/img6.webp' />
    </div>
    <div className={s.title}>
      О нас
      <img src='/footer/arrow.svg' />
    </div>
    <div className={s.row}>
      <div>
        <Link href='/about'>
          <a>О Fratelli Casa</a>
        </Link>
      </div>
      <div>
        <Link href='/about'>
          <a>Блог</a>
        </Link>
      </div>
      <div>
        <Link href='/help'>
          <a>F.A.Q.</a>
        </Link>
      </div>
    </div>
    <div className={s.title}>
      Магазин
      <img src='/footer/arrow.svg' />
    </div>
    <div className={s.row}>
      <div>
        <Link href='/help#1'>
          <a>Доставка</a>
        </Link>
      </div>
      <div>
        <Link href='/help#2'>
          <a>Обмен/возврат</a>
        </Link>
      </div>
      <div>
        <Link href='/help#3'>
          <a>Оплата</a>
        </Link>
      </div>
      <div>
        <Link href='/help#3'>
          <a>Как купить?</a>
        </Link>
      </div>
      <div>
        <Link href='/help#4'>
          <a>Примерка</a>
        </Link>
      </div>
    </div>
    <div className={s.title}>
      Девушки
      <img src='/footer/arrow.svg' />
    </div>
    <div className={s.row}>
      <div>
        <Link href='/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya'>
          <a>Футболки</a>
        </Link>
      </div>
      <div>
        <Link href='/catalog/svitshoty'>
          <a>Свитшоты</a>
        </Link>
      </div>
      <div>
        <Link href='/catalog/kurtki'>
          <a>Куртки</a>
        </Link>
      </div>
      <div>
        <Link href='/catalog/pizhamki'>
          <a>Пижамы</a>
        </Link>
      </div>
    </div>
    <div className={s.title}>
      Мужчины
      <img src='/footer/arrow.svg' />
    </div>
    <div className={s.row}>
      <div>
        <Link href='/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-muzhskaya'>
          <a>Футболки</a>
        </Link>
      </div>
      <div>
        <Link href='/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-muzhskaya'>
          <a>Свитшоты</a>
        </Link>
      </div>
      <div>
        <Link href='/catalog/kurtki-muzhskaya'>
          <a>Куртки</a>
        </Link>
      </div>
      <div>
        <Link href='/catalog/pizhamy'>
          <a>Пижамы</a>
        </Link>
      </div>
    </div>
    <div className={s.icons}>
      {/* <a href='/'>
        <img src='/footer/click.svg' />
      </a>
      <a href='/'>
        <img src='/footer/payme.svg' />
      </a> */}
      <a href='/'>
        <img src='/footer/visa.svg' />
      </a>
      <a href='/'>
        <img src='/footer/mastercard.svg' />
      </a>
    </div>
  </section>
)
export default FooterMobile
