import s from './home-one.module.scss'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const HomeOne = () => (
  <div className={s.wrapper}>
    <Carousel
      showArrows={true}
      autoPlay={true}
      showThumbs={false}
      showIndicators={false}
      className={s.wrapper}
      showStatus={false}
      interval={5000}
      infiniteLoop={true}
      swipeScrollTolerance={100}
      preventMovementUntilSwipeScrollTolerance={true}
    >
      <div>
        <Link href='/catalog/zhenskaya'>
          <a className={s.autumn}>
            <div className={s.inner}>
              <div className={s.title}>Женская одежда с орнаментом</div>
              <div className={s.buttons}>
                <Link href='/catalog/zhenskaya'>
                  <a>Купить</a>
                </Link>
              </div>
            </div>
          </a>
        </Link>
      </div>
      {/*<div>*/}
      {/*  <div className={s.women}>*/}
      {/*    <div className={s.inner}>*/}
      {/*      <div className={s.title}>Весна-лето</div>*/}
      {/*      <div className={s.buttons}>*/}
      {/*        <Link href='/catalog/zhenskaya'>*/}
      {/*          <a>Для девушек</a>*/}
      {/*        </Link>*/}
      {/*        <Link href='/catalog/muzhskaya'>*/}
      {/*          <a>Для мужчин</a>*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div>
        <Link href='/catalog'>
          <a className={s.zoodpay}></a>
        </Link>
      </div>
    </Carousel>
  </div>
)
export default HomeOne
