import s from './links-modal.module.scss'
import { useState } from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

const CartModal = ({ header, slug, body, bodySlug, products }) => {
  const [isShown, setIsShown] = useState(false)
  return (
    <div
      className={`${s.link} ${
        process.browser && window.location.pathname === slug ? s.active : ''
      } `}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Link href={slug}>
        <a>{header}</a>
      </Link>
      {isShown && body && products && (
        <div className={s.menu}>
          <div className={s.left}>
            {body.map(
              ({ slug, name, products }) =>
                products.nodes.length !== 0 && (
                  <Link href={bodySlug + slug} key={uuidv4()}>
                    <a> {name} </a>
                  </Link>
                )
            )}
          </div>
          <div className={s.right}>
            {products.nodes.map(({ id, image, slug, name }) => (
              <Link key={id} href={'/product/' + slug}>
                <a>
                  <img src={image?.sourceUrl} alt='' />
                  <div>{name}</div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CartModal
