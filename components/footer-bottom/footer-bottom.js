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
        <Link href='https://billz.uz'>
          <a>
            E-commerce решение от
            <img src='/footer/billz.svg' />
          </a>
        </Link>
      </div>
    </div>
  </section>
)
export default FooterBottom
