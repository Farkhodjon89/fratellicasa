import s from './home-three.module.scss';
import Link from 'next/link';

const HomeThree = () => (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.title}>Для девушек</div>
        <div className={s.main}>
          <div className={s.icons}>
            <Link href="/catalog/hudi-muzhskaya-hudi-noir-muzhskaya-hudi-noir-zhenskaya">
              <a>
                <img src="/home/home-three-1.svg" alt=""/>
                <div>Худи</div>
              </a>
            </Link>
            <Link href="/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-zhenskaya">
              <a>
                <img src="/home/home-three-3.svg" alt=""/>
                <div>Свитшоты</div>
              </a>
            </Link>
            <Link href="/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya">
              <a>
                <img src="/home/home-three-4.svg" alt=""/>
                <div>Футболки</div>
              </a>
            </Link>
          </div>
        </div>
        <div className={s.watch}>
          <Link href="/catalog/zhenskaya">Смотреть коллекцию</Link>
        </div>
      </div>
      <div className={s.inner}>
        <div className={s.title}>Для мужчин</div>
        <div className={s.main}>
          <div className={s.icons}>
            <Link href="/catalog/hudi-muzhskaya-hudi-noir-muzhskaya-hudi-noir-muzhskaya">
              <a>
                <img src="/home/home-three-5.svg" alt=""/>
                <div>Худи</div>
              </a>
            </Link>
            <Link href="/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-muzhskaya">
              <a>
                <img src="/home/home-three-8.svg" alt=""/>
                <div>Футболки</div>
              </a>
            </Link>
          </div>
        </div>
        <div className={s.watch}>
          <Link href="/catalog/muzhskaya">
            <a>Смотреть коллекцию</a>
          </Link>
        </div>
      </div>
      <div className={s.innerMob}>
        <div className={s.titleMob}>
          Для девушек
          <Link href="/catalog/zhenskaya">
            <a>
              Смотреть всё
              <img src="/home/home-three-9.svg" alt=""/>
            </a>
          </Link>
        </div>
        <div className={s.mainMob}>
          <Link href="/catalog/hudi-muzhskaya-hudi-noir-muzhskaya-hudi-noir-zhenskaya">
            <a>
              <img src="/home/home-three-1.svg" alt="" className={s.img1}/>
              Худи
            </a>
          </Link>
          <Link href="/catalog/svitshot-svitshot-detskij-zhenskaya-2-zhenskaya-zhenskaya">
            <a>
              <img src="/home/home-three-3.svg" alt="" className={s.img3}/>
              Свитшоты
            </a>
          </Link>
          <Link href="/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-zhenskaya">
            <a>
              <img src="/home/home-three-4.svg" alt="" className={s.img4}/>
              Футболки
            </a>
          </Link>
        </div>
      </div>
      <div className={s.innerMob}>
        <div className={s.titleMob}>
          Для мужчин
          <Link href="/catalog/muzhskaya">
            <a>
              Смотреть всё
              <img src="/home/home-three-9.svg" alt=""/>
            </a>
          </Link>
        </div>
        <div className={s.mainMob}>
          <Link href="/catalog/hudi-muzhskaya-hudi-noir-muzhskaya-hudi-noir-muzhskaya">
            <a>
              <img src="/home/home-three-5.svg" alt="" className={s.img5}/>
              Худи
            </a>
          </Link>
          <Link href="/catalog/futbolki-futbolka-maternity-zhenskaya-futbolka-maternity-muzhskaya">
            <a>
              <img src="/home/home-three-8.svg" alt="" className={s.img8}/>
              Футболки
            </a>
          </Link>
        </div>
      </div>
    </div>
);
export default HomeThree;
