import s from './footer-top.module.scss'
import Link from 'next/link'

const FooterTop = () => (
  <section className={s.wrapper}>
    <div className={s.inner1}>
      <div className={s.left}>
        <img src='/footer/logo.svg' />
        Fratelli Casa
      </div>
      <div className={s.right}>
        <div className={s.fs}>
          <div className={s.follow}>
            Следите за <br /> нами в Instagram
          </div>
          <div className={s.subscribe}>
            <Link href='https://www.instagram.com/fratellicasa_uz/'>
              <a> Подписаться </a>
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
          <img src='/footer/img7.jpg' />
          <img src='/footer/img8.jpg' />
        </div>
      </div>
    </div>
    <div className={s.line} />
    <div className={s.inner2}>
      <div className={s.col}>
        <div>Контакты</div>
        <div>
          <a href='mailto:salom@fratellicasa.com'>salom@fratellicasa.com</a>
        </div>
        <div>
          <a href='tel:+998909029419'>+998 90 902 94 19</a>
        </div>
        <div>
          Ташкент, <br /> Юнусабадский район (mavze), <br /> 4 - квартал, 1 -
          дом (uy), <br /> 220 - квартира (xonadon)
        </div>
      </div>
      <div className={s.col}>
        <div>О нас</div>
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
      <div className={s.col}>
        <div>Магазин</div>
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
      <div className={s.col}>
        <div>Девушки</div>
        <div>
          <Link href='/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya'>
            <a>Футболки</a>
          </Link>
        </div>
        <div>
          <Link href='/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-zhenskaya'>
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
      <div className={s.col}>
        <div>Мужчины</div>
        <div>
          <Link href='/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya-futbolka-maternity-muzhskaya'>
            <a>Футболки</a>
          </Link>
        </div>

        <div>
          <Link href='/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-muzhskaya'>
            <a>Свитшоты</a>
          </Link>
        </div>
        <div>
          <Link href='/catalog/kurtki'>
            <a>Куртки</a>
          </Link>
        </div>
        <div>
          <Link href='/catalog/pizhamy-muzhskaya'>
            <a>Пижамы</a>
          </Link>
        </div>
      </div>
    </div>
    <div className={s.inner3}>
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
      <div className={s.icons}>
        {/* <Link href='/'>
          <a>
            <img src='/footer/click.svg' />
          </a>
        </Link>

        <Link href='/'>
          <a>
            <img src='/footer/payme.svg' />
          </a>
        </Link> */}

        <Link href='/'>
          <a>
            <img src='/footer/visa.svg' />
          </a>
        </Link>

        <Link href='/'>
          <a>
            <img src='/footer/mastercard.svg' />
          </a>
        </Link>
      </div>
    </div>
  </section>
)
export default FooterTop
