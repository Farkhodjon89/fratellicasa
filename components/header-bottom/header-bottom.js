import s from './header-bottom.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import HeaderMobile from '../header-mobile';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import CartModal from '../cart-modal';
import LinksModal from '../links-modal';
import { Context } from '../../pages/_app';

const HeaderBottom = ({ cartItems, wishlistItems, category, openCart, setOpenCart }) => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
  const link1 = [
    {
      key: '0',
      header: 'Девушкам',
      slug: '/catalog/zhenskaya',
      body: category[0].node.children.nodes,
      bodySlug: '/catalog/',
      products: category[0].node.products,
    },
    {
      key: '1',
      header: 'Мужчинам',
      slug: '/catalog/muzhskaya',
      body: category[1].node.children.nodes,
      bodySlug: '/catalog/',
      products: category[1].node.products,
    },
    {
      key: '2',
      header: 'Девочкам',
      slug: '/catalog/devochkam',
      body: category[2].node.children.nodes,
      bodySlug: '/catalog/',
      products: category[2].node.products,
    },
    {
      key: '3',
      header: 'Дом',
      slug: '/catalog/dom-2',
      body: category[3].node.children.nodes,
      bodySlug: '/catalog/',
      products: category[3].node.products,
    },
  ];
  const link2 = [
    // {
    //   header: 'О нас',
    //   slug: '/about',
    // },
    {
      header: 'Помощь',
      slug: '/help',
    },
    {
      header: 'Скидки',
      slug: '/catalog/sale',
    },
  ];
  const links = [...link1, ...link2];
  return (
    <>
      <section className={s.wrapper}>
        <div className={s.inner}>
          <Link href="/">
            <a className={s.logo}>
              <img src="/header/logo.svg" />
            </a>
          </Link>
          <div className={s.links}>
            {links.map(({ header, slug, body, bodySlug, products }) => (
              <LinksModal
                key={uuidv4()}
                header={header}
                slug={slug}
                body={body}
                bodySlug={bodySlug}
                products={products}
              />
            ))}
          </div>
          <div className={s.actions}>
            {state.currency === 'USD' ? (
              <button onClick={() => dispatch({ type: 'UZ' })}>
                <img src="/usd.svg" alt="" />
              </button>
            ) : (
              <button onClick={() => dispatch({ type: 'USD' })}>СУМ</button>
            )}
            <div className={s.actionsLeft}>
              {/* <div className={s.lang}>
              <img src='/header/ru.svg' />
            </div> */}
              <Link href="/catalog/zhenskaya" className={s.search}>
                <a>
                  <img src="/header/search.svg" />
                </a>
              </Link>
            </div>
            <div className={s.actionsRight}>
              {/* <Link href='/'>
              <a className={s.signIn}>
                <img src='/header/sign-in.svg' />
              </a>
            </Link> */}
              <Link href="/wishlist">
                <a className={s.like}>
                  <img src="/header/like.svg" />
                  {wishlistItems.length ? <span>{wishlistItems.length}</span> : ''}
                </a>
              </Link>
              <Link href="/application-cart">
                <a className={s.cart}>
                  <img src="/header/basket.svg" />
                  {cartItems.length ? <span>{cartItems.length}</span> : ''}
                </a>
              </Link>
              <CartModal activeStatus={openCart} getActiveStatus={setOpenCart} />
            </div>
          </div>
          <div className={s.burger} onClick={() => setOpen(true)}>
            <span />
          </div>
        </div>
        <HeaderMobile activeStatus={open} getActiveStatus={setOpen} link1={link1} link2={link2} />
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};

export default connect(mapStateToProps, null)(HeaderBottom);
