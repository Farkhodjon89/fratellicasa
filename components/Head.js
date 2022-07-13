import React from 'react'
import {NextSeo} from 'next-seo'
import Head from 'next/head'

const SITE_URL = 'https://fratellicasa.com/'
const SITE_NAME = 'FRATELLICASA'
const DEFAULT_TITLE =
    'Интернет-магазин мужской и женской одежды | Fratelli Casa'
const DEFAULT_DESCRIPTION =
    'Модная мужская и женская одежда с восточным узором. 100% хлопок, ручная работа, эко-материалы. Доставка по всему Миру!'

export const HeadData = ({title, description, image, product, pageUrl}) => {

  let _pageUrl = (pageUrl || '').split('/')

  if (_pageUrl.length > 2) {
    _pageUrl[_pageUrl.length - 1] = ''
  }

  _pageUrl = _pageUrl.join('/')

  const productRichSnippets =
    _pageUrl === '/product/'
      ? {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          image: product.image && product.image[0],
          description: product.description || description,
          brand: 'Fratellicasa',
          mpn: product.sku,
          offers: {
            '@type': 'Offer',
            url: `https://fratellicasa.com//product/${product.slug}`,
            priceCurrency: 'UZS',
            price: product.price,
            priceValidUntil: '2031-01-01',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '0',
            ratingCount: '1',
            reviewCount: '1',
          },
          review: {
            '@type': 'Review',
            name: product.name,
            reviewBody: `Лучшие ${product.name} за ${product.price} сум!`,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
              worstRating: '0',
            },
            datePublished: '2020-11-01',
            author: { '@type': 'Person', name: 'Fratellicasa' },
            publisher: { '@type': 'Organization', name: 'Fratellicasa' },
          },
        }
      : null

  return (
      <>
        <NextSeo
            title={title ? title : DEFAULT_TITLE}
            description={description ? description : DEFAULT_DESCRIPTION}
            openGraph={{
              images: [
                {
                  url: image
                      ? image
                      : 'https://wp.fratellicasa.com/wp-content/uploads/2021/12/seologo.png',
                },
              ],
              url: SITE_URL,
              title: title ? title : DEFAULT_TITLE,
              site_name: SITE_NAME,
              locale: 'ru_RU',
              type: 'website',
              description: description ? description : DEFAULT_DESCRIPTION,
            }}
            twitter={{
              cardType: 'summary',
              handle: '@handle',
              site: '@site',
              title: title ? title : DEFAULT_TITLE,
              description: description ? description : DEFAULT_DESCRIPTION,
            }}
        />
        <Head>
          
          {process.env.NODE_ENV === 'production' && _pageUrl === '/product/' ? (
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(productRichSnippets),
              }}
            />
          ) : null}      
          
          {process.env.NODE_ENV === 'production' && (
              <>
                
                <meta
                    name='facebook-domain-verification'
                    content='8z91bqdwuptkaitmayod7zkl0gjp9a'
                />
                <script
                    dangerouslySetInnerHTML={{
                      __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1235579203591328');
            fbq('track', 'PageView');            
                  ${
                          product &&
                          `fbq('track', 'ViewContent', ${JSON.stringify({
                            content_ids: product.id,
                            content_type: 'product',
                            value: product.onSale
                                ? product.woocsSalePrice
                                : product.woocsRegularPrice,
                            currency: 'UZS',
                          })});`
                      }
                `,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                      __html: `
              <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1235579203591328&ev=PageView&noscript=1"
              />
                        `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                        ym(54763411, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                        });
                        `,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                      __html: `
                        <div><img src="https://mc.yandex.ru/watch/54763411" style="position:absolute; left:-9999px;" alt="" /></div>
                        `,
                    }}
                />
                <script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=UA-149842385-1'
                />
                <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-149842385-1');
                        `,
                    }}
                />
              </>
          )}
        </Head>
      </>
  )
}
