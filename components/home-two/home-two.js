import { useMemo } from 'react'
import s from './home-two.module.scss'
import Link from 'next/link'

const HomeTwo = () => {
  const items = useMemo(
    () => [
      {
        link: '/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-zhenskaya',
        title: 'Женские футболки с орнаментом',
        imgUrl: '/home/cover2.jpg',
      },
      {
        link: '/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya-futbolka-maternity-muzhskaya',
        title: 'Мужские футболки с орнаментом',
        imgUrl: '/home/home-two-1.jpg',
      },
      {
        link: '/catalog/aksessuary',
        title: 'Женские аксессуары',
        imgUrl: '/home/home-two-3.webp',
      },
      {
        link: '/catalog/dizajnerskie-skaterti',
        title: 'Декор-текстиль с узорами',
        imgUrl: '/home/home-two-4.jpg',
      },
    ],
    []
  )

  return (
    <div className={s.wrapper}>
      <div className={s.innerWrapper}>
        {items.map((el, index) => (
          <div
            className={s.block}
            style={{ backgroundImage: `url(${el.imgUrl})` }}
          >
            {index === 0 ? (
              <div className={s.desc}>
                <div className={s.text}>{el.title}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '50px',
                  }}
                >
                  <Link href={'/catalog/zhenskaya'}>
                    <a>
                      <div className={`${s.link} ${s.largeLink}`}>
                        Для девушек
                      </div>
                    </a>
                  </Link>
                  <Link href={'/catalog/muzhskaya'}>
                    <a>
                      <div className={`${s.link} ${s.largeLink}`}>
                        Для мужчин
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <Link href={el.link}>
                <a className={s.desc}>
                  <div className={s.text}>{el.title}</div>
                  <div className={s.link}>Купить</div>
                </a>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default HomeTwo
