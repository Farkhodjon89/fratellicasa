import s from './home-two.module.scss'
import Link from 'next/link'

const HomeTwo = () => (
  <div className={s.wrapper}>
    {/* <div className={s.title}>
      <div>
        Получите <span> 50 000 сум </span> на первую покупку
      </div>
      <div>
        <Link href='/'>Получить сумму</Link>
      </div>
    </div> */}
    <div className={s.row1}>
      <div className={s.left1}>
        <Link href='/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-zhenskaya'>
          <a>
            <div>Женские свитшоты</div>
            <div className={s.link}>Купить</div>
          </a>
        </Link>
      </div>
      <div className={s.right1}>
        <Link href='/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-muzhskaya'>
          <a>
            <div>Мужские футболки</div>
            <div className={s.link}>Купить</div>
          </a>
        </Link>
      </div>
    </div>
    <div className={s.row2}>
      <div className={s.left2}>
        {/*<img src='/home/home-two-3.jpg' />*/}
        <Link href='/catalog/aksessuary'>
          <a>
            <div className={s.text}>Женские аксессуары</div>
            <div className={s.link}>Купить</div>
          </a>
        </Link>
      </div>
      <div className={s.right2}>
        <Link href='/catalog/dizajnerskie-skaterti'>
          <a>
            <div className={s.text}>Дизайнерские скатерти</div>
            <div className={s.link}>Купить</div>
          </a>
        </Link>
        {/*<img src='/home/home-two-4.jpg' />*/}
      </div>
    </div>
    {/* <div className={s.row3}>
      <div className={s.left3}>
        <img src='/home/home-two-5.jpg' />
        <img src='/home/home-two-5-mob.jpg' />
        <Link href='/catalog/svitshot-svitshot-detskij-zhenskaya'>
          <a>
            <div className={s.text}>Свитшоты</div>
            <div className={s.link}>Смотреть</div>
          </a>
        </Link>
      </div>
      <div className={s.right3}>
        <Link href='/catalog/sale'>
          <a>
            <div className={s.text}>СКИДКИ</div>
            <div className={s.link}>Смотреть</div>
          </a>
        </Link>
        <div className={s.img3}> До 50 %</div>
      </div>
    </div> */}
  </div>
)
export default HomeTwo
