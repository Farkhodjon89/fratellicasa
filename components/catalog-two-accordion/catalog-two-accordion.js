import s from './catalog-two-accordion.module.scss'
import { useState, useRef, useEffect } from 'react'

const CatalogTwoAccordion = ({ name, optionList, active, getFilterParams }) => {
  const result = optionList?.reduce(
    (acc, { props }) => ({ ...acc, [props.option.slug]: props.option.name }),
    {}
  )
  const activeCategories = active.map((x) => result[x])

  const [open, setOpen] = useState(false)
  const myRef = useRef()
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setOpen ? setOpen(false) : ''
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  // const sendData = () => {
  //   if (name === 'Категория:') {
  //     getFilterParams('categories')
  //   }
  //   if (name === 'Цвет:') {
  //     getFilterParams('colors')
  //   }
  //   if (name === 'Размер:') {
  //     getFilterParams('sizes')
  //   }
  // }

  return (
    <>
      <div
        className={`${s.main}  ${activeCategories.length ? s.active : ''} `}
        ref={myRef}
      >
        <div className={s.head} onClick={() => setOpen(true)}>
          <div>
            {<span className={s.headName}>{name}</span>}{' '}
            {activeCategories.join(', ')}
          </div>
          {/* {open && active.length !== 0 ? (
            <img onClick={() => sendData()} src='/catalog/clear.svg' />
          ) : (
            <img src='/catalog/arrow.svg' />
          )} */}
          <img src='/catalog/arrow.svg' />
        </div>
        <div className={`${s.body}  ${open && s.active}`}>{optionList}</div>
      </div>
    </>
  )
}

export default CatalogTwoAccordion
