import s from './catalog-three.module.scss'
import Link from 'next/link'

const CatalogThree = () => (
  <div className={s.wrapper}>
    <div className={s.top}>
      <Link href='/help#1'>
        <a className={s.bar}>
          <img src='/catalog/bus.svg' alt='' />
          Информация о доставке
        </a>
      </Link>
      <Link href='/help#4'>
        <a className={s.bar}>
          <img src='/catalog/size.svg' alt='' />
          Найти правильный размер
        </a>
      </Link>
    </div>
    <div className={s.bottom}>
      <div className={s.title}>
        ДОБРО ПОЖАЛОВАТЬ В ИНТЕРНЕТ-МАГАЗИН БРЕНДОВОЙ ОДЕЖДЫ FRATELLI CASА.
      </div>
      <div className={s.text}>
        Мы передаём красоту узбекского орнамента, создавая стильную и удобную
        одежду с узорами иката, сюзане и граната, а также загадочными элементами
        узбекской тюбетейки. Коллекция Fratelli Casa - это современная и
        колоритная одежда, которая отлично сочетается с джинсами, пиджаком,
        куртками и кроссами.
      </div>
    </div>
  </div>
)
export default CatalogThree
