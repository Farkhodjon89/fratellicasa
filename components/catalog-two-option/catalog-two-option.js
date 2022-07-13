import { useState } from 'react'
import s from './catalog-two-option.module.scss'
import Link from 'next/link'

const CatalogTwoOption = ({ name, option, getFilterParams, active }) => {
  const sendData = () => {
    if (name === 'Категория:') {
      getFilterParams('categories', option.slug)
    }
    if (name === 'Цвет:') {
      getFilterParams('colors', option.slug)
    }
    if (name === 'Размер:') {
      getFilterParams('sizes', option.slug)
    }
  }
  return name === 'Категория:' ? (
    <Link href={'/catalog/' + option.slug}>
      <a className={s.option}>{option.name}</a>
    </Link>
  ) : (
    <div className={s.option} onClick={() => sendData()}>
      <div className={active.includes(option.slug) ? s.active : ''}>{option.name}</div>
      {active.includes(option.slug) ? <img src='/catalog/clear.svg' /> : ''}
    </div>
  )
}
export default CatalogTwoOption
