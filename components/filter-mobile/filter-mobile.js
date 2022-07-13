import s from './filter-mobile.module.scss'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import Accordion from 'react-bootstrap/Accordion'

const HeaderMobile = ({
  filters,
  setFilters,
  activeStatus,
  getActiveStatus,
  data,
  getFilterParams,
}) => {
  const sendData = (option, name) => {
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
  return (
    <div className={`${s.wrapper}  ${activeStatus && s.active}`}>
      <div className={s.top}>
        <Link href='/'>
          <a className={s.logo}>
            <img src='/header/logo.svg' />
          </a>
        </Link>
        <div className={s.filter}>
          <img src='/catalog/filter.svg' />
          Фильтр
        </div>
        <div className={s.burger} onClick={() => getActiveStatus(false)} />
      </div>
      <div className={s.links}>
        {data.map(({ id, name, options, active }) => {
          const result = options?.reduce(
            (acc, { name, slug }) => ({ ...acc, [slug]: name }),
            {}
          )
          const activeCategories = active.map((x) => result[x])
          return (
            <Accordion key={uuidv4()} className={s.card}>
              <Accordion.Toggle className={s.cardHeader} eventKey={id}>
                <div>
                  <span>{name}</span> {activeCategories.join(', ')}
                </div>
                <img src='/header/arrow.svg' />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={id}>
                <>
                  {name === 'Категория:'
                    ? options?.map((option) => (
                        <Link href={'/catalog/' + option.slug} key={uuidv4()}>
                          <a className={s.cardBody}>{option.name}</a>
                        </Link>
                      ))
                    : options.map((option) => (
                        <div
                          key={uuidv4()}
                          onClick={() => sendData(option, name)}
                          className={s.cardBody}
                        >
                          <div
                            className={
                              active.includes(option.slug) ? s.activeFilter : ''
                            }
                          >
                            {option.name}
                          </div>
                          {active.includes(option.slug) ? (
                            <img src='/catalog/clear.svg' />
                          ) : (
                            ''
                          )}
                        </div>
                      ))}
                </>
              </Accordion.Collapse>
            </Accordion>
          )
        })}
        <div className={s.bottom}>
          <button
            className={s.makeFilter}
            onClick={() => getActiveStatus(false)}
          >
            Применить фильтр <img src='/catalog/use.svg' alt='' />
          </button>
          {Object.keys(filters).length ? (
            <button
              className={s.resetFilter}
              onClick={() => setFilters({ isReset: true })}
            >
              <img src='/catalog/cancel.svg' alt='' /> Отменить всё
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default HeaderMobile
