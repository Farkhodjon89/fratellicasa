import React from 'react';
import s from './top-banner.module.scss';
import Link from 'next/link';

const TopBanner = () => {
  return (
      <Link href='/catalog/sale'>
        <a>
          <div className={s.wrapper}>
          </div>
        </a>
      </Link>

  );
};

export default TopBanner;