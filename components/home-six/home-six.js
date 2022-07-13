import s from './home-six.module.scss';
import Link from 'next/link';

const HomeSix = () => (
  <div className={s.wrapper}>
    <div className={s.innerTop}>
      <img className={s.man} src="/home/home-six-1.webp" />

      <div className={s.basic}>
        <div className={s.logoText}>
          <img src="/home/home-six-2.png" />
          <div>КАЖДЫЙ ДЕНЬ – ДЛЯ ТЕБЯ</div>
        </div>
        <span>B</span>
        <span>A</span>
        <span>S</span>
        <span>I</span>
        <span>C</span>
      </div>
    </div>
    <div className={s.innerBot}>
      Футболки Basic, другими словами, однотонные футболки являются одним из актуальных и
      востребованных изделий одежды в нашей линейке. Такие футболки отлично сочетаются с разным
      стилем одежды и легко вписываются в любой гардероб. Просто, удобно, стильно.
      <Link href="/catalog/bazovye">
        <a>Открыть коллекцию Basic</a>
      </Link>
    </div>
  </div>
);
export default HomeSix;
