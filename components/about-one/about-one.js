import s from './about-one.module.scss';
import Link from 'next/link';

const AboutOne = () => (
  <div className={s.wrapper}>
    <div className={s.banners}>
      <img src="/about/banner1.jpg" alt="" />
      <img src="/about/banner2.jpg" alt="" />
    </div>
    <div className={s.inner}>
      <img src="/about/logo.svg" alt="" />
      <div className={s.text}>
        Fratelli Casa, означающий в переводе с итальянского языка Дом Братьев, был создан братьями
        Шерзодом и Шохрухом в Ташкенте.
        <br />
        <br />
        Самая первая футболка бренда была продана 17 мая 2006 года, поэтому этот день символически
        считается днём создания Fratelli Casa.
        <br />
        <br />
        Наша аудитория – активные люди со всего мира, любящие практичность и простоту в одежде.
        <br />
        <br />
        Среди нашей продукции есть то, что мы с гордостью можем представить на любом рынке –
        футболки с восточным орнаментом. Принты изящных восточных узоров с многовековой историей на
        футболках, сделанных из хлопка – наша главная фишка, нашедшая поклонников и поклонниц в
        разных точках мира.
        <br />
        <br />
        Fratelli Casa удалось популяризовать национальные узоры и перевести их на обычную одежду,
        продающуюся по доступным ценам: они стали частью гардероба модных соотечественниц и
        прекрасным решением в качестве оригинальных подарков.
        <br />
        <br />
        Постоянные звонки от узбекистанцев и студентов, живущих и учащихся за границей, с просьбой
        отправить им тот или иной комплект одежды, а также футболки с принтами UZB или UZBEKISTAN
        стали ещё одним фактором, подтверждающим успешность стратегии работы с потребителем.
        <br />
        <br />
        Покупайте нашу продукцию с историей в узорах из гостеприимного Ташкента.
      </div>
      <div className={s.info}>
        <div className={s.left}>
          <div className={s.title}>Основатели Fratelli Casa</div>
          <div className={s.founders}>
            <div>
              <img src="/about/person1.png" alt="" />
              Шохрух <br /> Каюмов
            </div>
            <div>
              <img src="/about/person2.png" alt="" />
              Шерзод <br /> Каюмов
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.title}>Контакты</div>
          <Link href="mailto: salom@fratellicasa.com">
            <a>salom@fratellicasa.com</a>
          </Link>

          <Link href="tel:+998909029419">
            <a>+998909029419</a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
export default AboutOne;
