import s from './header-mobile.module.scss'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import Accordion from 'react-bootstrap/Accordion'

const HeaderMobile = ({ activeStatus, getActiveStatus, link1, link2 }) => {
  return (
    <div className={`${s.wrapper}  ${activeStatus && s.active}`}>
      <div className={s.top}>
        <Link href='/'>
          <a className={s.logo}>
            <img src='/header/logo.svg' />
          </a>
        </Link>
        <div className={s.lang}>
          {/* <img src='/header/ru.svg' /> */}
          {/* <img src='header/uz.svg' /> */}
        </div>
        <div className={s.burger} onClick={() => getActiveStatus(false)} />
      </div>
      {/* <div className={s.searchInput}>
        <input type='text' placeholder='Например: футболка или пижама' />
        <img src='/header/search.svg' />
      </div> */}
      <div className={s.links}>
        {link1.map((link1) => (
          <Accordion key={uuidv4()} className={s.card}>
            <Accordion.Toggle className={s.cardHeader} eventKey={link1.key}>
              {link1.header}
              <img src='/header/arrow.svg' />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={link1.key}>
              <>
                {link1.body.map(({ slug, name, products }) => {
                  return (
                    products.nodes.length !== 0 && (
                      <Link href={link1.bodySlug + slug} key={uuidv4()}>
                        <a
                          className={s.cardBody}
                          onClick={() => getActiveStatus(false)}
                        >
                          {name}
                        </a>
                      </Link>
                    )
                  )
                })}
              </>
            </Accordion.Collapse>
          </Accordion>
        ))}

        {link2.map(({ header, slug }) => {
          return (
            <Accordion key={uuidv4()} className={s.card}>
              <Link href={slug}>
                <a
                  className={s.cardHeader}
                  onClick={() => getActiveStatus(false)}
                >
                  {header}
                </a>
              </Link>
            </Accordion>
          )
        })}
      </div>
      <div className={s.bottom}>
        {/* <Link href='/' className={s.signIn}>
        <a>
          Войти или зарегистрироваться
          <img src='/header/sign-in.svg' />
        </a>
      </Link> */}
        <Link href='/wishlist' className={s.like}>
          <a>
            Избранные
            <img src='/header/like.svg' />
          </a>
        </Link>
      </div>
    </div>
  )
}
export default HeaderMobile
