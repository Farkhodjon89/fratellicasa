// import s from './footer.module.scss';
import FooterTop from '../footer-top';
import FooterMobile from '../footer-mobile';
import FooterBottom from '../footer-bottom';
import Link from 'next/link';

const Footer = () => (
    <footer>
      <Link href="http://t.me/fratellicasa_uz" target="_blank">

        <a className="contact-tg">
          <img src="/telegram-logo.svg" alt="Telegram logo" className="mr-2" width="30" height="30"/>
          Написать нам
        </a>
      </Link>

      <FooterTop/>
      <FooterMobile/>
      <FooterBottom/>
    </footer>
);
export default Footer;
