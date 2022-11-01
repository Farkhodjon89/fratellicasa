import s from './footer-application.module.scss';
import Link from 'next/link';

const FooterApplication = () => (
    <footer>
      <section className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            <div className={s.help}>Нужна помощь?</div>


            <Link href="http://t.me/fratellicasa_uz">

              <a className={s.links}>
                <img src="/application/telegram.svg" alt=""/>
                Написать
              </a>
            </Link>
            <Link href="tel:+998909029419">
              <a className={s.links}>
                <img src="/application/phone.svg" alt=""/>
                Позвонить
              </a>
            </Link>
          </div>
          <div className={s.right}>
            <Link href="/">
              <a>
                <img src="/footer/click.svg"/>
              </a>
            </Link>

            <Link href="/">
              <a>
                <img src="/footer/payme.svg"/>
              </a>
            </Link>

            <Link href="/">
              <a>
                <img src="/footer/visa.svg"/>
              </a>
            </Link>

            <Link href="/">
              <a>
                <img src="/footer/mastercard.svg"/>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className={s.wrapperMob}>
        <div className={s.topMob}>
          <div className={s.helpMob}>Нужна помощь?</div>
          <div className={s.linksMob}>
            {/*<Link href="/">*/}
            {/*  <a>*/}
            {/*    <img src="/application/telegramMob.svg" alt=""/>*/}
            {/*  </a>*/}
            {/*</Link>*/}
            {/*<Link href="tel:+998909029419">*/}
            {/*  <a>+998 90 902 94 19</a>*/}
            {/*</Link>*/}
          </div>

          <Link href="https://t.me/fratellicasa_uz">
            <a className={s.links}>
              <img src="/application/telegram.svg" alt=""/>
              Написать
            </a>
          </Link>
          <Link href="tel:+998909029419">
            <a className={s.links}>
              <img src="/application/phone.svg" alt=""/>
              Позвонить
            </a>
          </Link>

        </div>
        <div className={s.bottomMob}>
          <Link href="/">
            <a>
              <img src="/footer/click.svg"/>
            </a>
          </Link>

          <Link href="/">
            <a>
              <img src="/footer/payme.svg"/>
            </a>
          </Link>

          <Link href="/">
            <a>
              <img src="/footer/visa.svg"/>
            </a>
          </Link>

          <Link href="/">
            <a>
              <img src="/footer/mastercard.svg"/>
            </a>
          </Link>
        </div>

      </section>
      <section className={s.wrapper2}>
        <div className={s.inner2}>
          <div>© Fratelli Casa</div>
          <div>
            <Link href="/user-agreement">
              <a>Пользовательское соглашение</a>
            </Link>
          </div>
          <div>
            <Link href="/user-agreement">
              <a>Политика конфиденциальности</a>
            </Link>
          </div>

          <div className={s.billz}>
            <Link href="https://billz.io">
              <a>
                E-commerce решение от
                <img src="/footer/billz.svg"/>
              </a>
            </Link>

          </div>
        </div>
      </section>
    </footer>
);
export default FooterApplication;
