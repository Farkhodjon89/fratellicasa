import Link from 'next/link';
import s from './header-application.module.scss';
import { useRouter } from 'next/router';

const HeaderApplication = ({ order }) => {
  const orderKey = order && order.orderKey;
  const router = useRouter();
  return (
    <>
      <header className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.left}>
            {router.asPath !== '/application-order/' + orderKey ? (
              router.pathname === '/application-cart' ? (
                <>
                  <a className={s.backLink} href="/catalog/zhenskaya">
                    <img src="/application/back.svg" alt="" />
                    Назад к покупкам
                  </a>
                  <a href="/">
                    <img src="/application/logo.svg" alt="" />
                  </a>
                </>
              ) : (
                <>
                  <a className={s.backLink} href="/application-cart">
                    <img src="/application/back.svg" alt="" />
                    Назад в корзину
                  </a>
                  <a href="/">
                    <img src="/application/logo.svg" alt="" />
                  </a>
                </>
              )
            ) : (
              <a href="/">
                <img src="/application/logo.svg" alt="" />
              </a>
            )}
          </div>
          <div className={s.right}>
            <div className={s.help}>Нужна помощь?</div>


            <Link href="https://t.me/fratellicasa_uz">

              <a className={s.links}>
                <img src="/application/telegram.svg" alt="" />
                Написать
              </a>
            </Link>

            <Link href="tel:+998909029419">
              <a className={s.links}>
                <img src="/application/phone.svg" alt="" />
                Позвонить
              </a>
            </Link>
          </div>
        </div>
      </header>
      <header className={s.wrapperMob}>
        <div className={s.topMob}>
          <div className={s.helpMob}>Нужна помощь?</div>
          <div className={s.linksMob}>

            <Link href="https://t.me/fratellicasa_uz">

              <a>
                <img src="/application/telegramMob.svg" alt="" />
              </a>
            </Link>
            <Link href="tel:+998909029419">
              <a>+998 90 902 94 19</a>
            </Link>
          </div>
        </div>
        <div className={s.bottomMob}>
          {router.pathname === '/application-cart' ? (
            <Link href="/catalog/zhenskaya">
              <a className={s.backMob}>
                <img src="/application/back.svg" alt="" />
                Назад к покупкам
              </a>
            </Link>
          ) : router.asPath !== '/application-order/' + orderKey ? (
            <Link href="/application-cart">
              <a className={s.backMob}>
                <img src="/application/back.svg" alt="" />
                Назад в корзину
              </a>
            </Link>
          ) : (
            <div className={s.emptySpace} />
          )}
          <Link href="/">
            <a>
              <img src="/application/logo.svg" alt="" />
            </a>
          </Link>
          <div className={s.emptySpace} />
        </div>
      </header>
    </>
  );
};
export default HeaderApplication;
