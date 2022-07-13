import s from './catalog-one.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import CatalogTwoOption from '../catalog-two-option'
import CatalogTwoAccordion from '../catalog-two-accordion/catalog-two-accordion'
import FilterMobile from '../filter-mobile'

const CatalogOne = ({
  filters,
  setFilters,
  category,
  categoryBreadcrumb,
  colors,
  sizes,
  currentProducts,
  getFilterParams,
  searchData,
  searchQuery,
}) => {
  const data = [
    {
      id: '1',
      name: 'Категория:',
      options: category,
      active: filters.categories || [],
    },
    // {
    //   id: '2',
    //   name: 'Тип продукта:',
    //   options: []
    // },
    {
      id: '3',
      name: 'Цвет:',
      options: colors,
      active: filters.colors || [],
    },
    {
      id: '4',
      name: 'Размер:',
      options: sizes,
      active: filters.sizes || [],
    },
  ]

  // Filter Mobile Overlay
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const accordionList = data.map(({ name, options, active }) => {
    const optionList = options?.map((option, i) => {
      return (
        <CatalogTwoOption
          key={uuidv4()}
          i={i}
          name={name}
          option={option}
          active={active}
          getFilterParams={getFilterParams}
        />
      )
    })
    return (
      <CatalogTwoAccordion
        getFilterParams={getFilterParams}
        active={active}
        key={uuidv4()}
        name={name}
        active={active}
        optionList={optionList}
      />
    )
  })
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.breadcumbWrapper}>
          <div className={s.breadcumbInner}>
            <div>
              Главная {' > '} {categoryBreadcrumb}
            </div>
            <div>Найдено {currentProducts}</div>
          </div>
        </div>
        <div className={s.searchInput}>
          <input
            type='text'
            placeholder='Например: футболка или пижама'
            value={searchQuery}
            onChange={searchData}
          />
          <img src='/header/search.svg' />
        </div>
        <div className={s.filter}>
          {accordionList}
          {Object.keys(filters).length ? (
            <div
              className={s.head}
              onClick={() => setFilters({ isReset: true })}
            >
              Сбросить фильтры
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={s.filterMob} onClick={() => setOpen(true)}>
          <img src='/catalog/filter.svg' alt='' />
          Фильтр
        </div>
        <FilterMobile
          key={uuidv4()}
          filters={filters}
          setFilters={setFilters}
          activeStatus={open}
          getActiveStatus={setOpen}
          data={data}
          getFilterParams={getFilterParams}
        />
      </div>
    </div>
  )
}
export default CatalogOne
