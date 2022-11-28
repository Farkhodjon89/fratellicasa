import s from './footer-bottom.module.scss'
import Link from 'next/link'

const FooterBottom = () => (
  <section className={s.wrapper}>
    <div className={s.inner}>
      <div>{`© Fratelli Casa ${new Date().getFullYear()}. ООО "FRATELLI DI STILE"`}</div>
      <div>
        <Link href='/user-agreement'>
          <a>Пользовательское соглашение</a>
        </Link>
      </div>
      <div>
        <Link href='/user-agreement'>
          <a>Политика конфиденциальности</a>
        </Link>
      </div>
      <div className={s.billz}>
        <Link href='https://billz.io/online-store'>
          <a target="_blank" rel="nofollow, noreferrer">
            Сайт разработан компанией
            <img src='/footer/billz.svg' />
          </a>
        </Link>
      </div>
    </div>
  </section>
)
export default FooterBottom
