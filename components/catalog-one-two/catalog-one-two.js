import s from './catalog-one-two.module.scss'
import CatalogOne from '../catalog-one'
import CatalogTwo from '../catalog-two'
import { useState, useEffect } from 'react'
import client from '../../apollo/apollo-client'
import { useLazyQuery } from '@apollo/react-hooks'
import PRODUCTS from '../../queries/products'
import { v4 as uuidv4 } from 'uuid'
import queryString from 'query-string'

const CatalogOneTwo = ({
  categorySlug,
  products,
  pageInfo,
  category,
  categoryBreadcrumb,
  activeTerms,
}) => {
  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS, {
    client,
  })
  const [filters, setFilters] = useState({})
  const [currentProducts, setCurrentProducts] = useState(products)
  const [currentPageInfo, setCurrentPageInfo] = useState(pageInfo)
  const [activeTermsss, setActiveTermsss] = useState(activeTerms)

  const getFilterParams = (filterType, filterValue) => {
    const arrayValuesFor = ['categories', 'colors', 'sizes']
    if (filterValue === '' || filterValue == null) {
      const _filters = { ...filters }
      delete _filters[filterType]

      setFilters(_filters)
      setCurrentProducts([])
      return
    }
    if (arrayValuesFor.includes(filterType)) {
      let options = filters[filterType] || []

      if (options.includes(filterValue)) {
        options = options.filter((x) => x !== filterValue)
      } else {
        options = [...options, filterValue]
      }

      setFilters({
        ...filters,
        [filterType]: options,
      })
    } else {
      setFilters({
        ...filters,
        [filterType]: filterValue,
      })
    }

    setCurrentProducts([])
  }

  // if (typeof window !== 'undefined') {
  //   useEffect(() => {
  //     const { filters: _filters } = catalog.init()

  //     if (Object.keys(_filters).length) {
  //       setFilters({ ...filters, ..._filters })
  //     }

  //     setCurrentProducts([])
  //   }, [window.location.search])
  // }

  useEffect(() => {
    const { isReset, ..._filters } = filters

    // if (typeof window !== 'undefined') {
    //   const query = catalog.buildQuery({}, _filters)
    //   const location = `${window.location.pathname}${query ? '?' : ''}${query}`

    //   window.history.replaceState(null, '', location)
    // }

    if (Object.keys(filters).length) {
      loadProducts({
        variables: {
          categories: [categorySlug],
          ...generateFilterVariables(_filters),
        },
      })
    }

    if (isReset) {
      setFilters(_filters)
    }

    setCurrentProducts([])
  }, [filters])

  const [searchQuery, setSearchQuery] = useState('')

  const searchData = (e) => {
    setCurrentProducts([])
    setSearchQuery(e.target.value)

    if (e.target.value.length) {
      loadProducts({
        variables: {
          first: 8,
          search: e.target.value,
          categories: [categorySlug],
        },
      })
    }
  }

  useEffect(() => {
    if (data && searchQuery.length) {
      setCurrentProducts(...data.products.nodes)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      setCurrentPageInfo(data.products.pageInfo)
      setCurrentProducts([...currentProducts, ...data.products.nodes])
      setActiveTermsss(data.products.activeTerms)
    }
  }, [data])

  const loadMore = () => {
    if (currentPageInfo.hasNextPage) {
      loadProducts({
        variables: {
          first: 8,
          after: currentPageInfo.endCursor,
          categories: [categorySlug],
          ...generateFilterVariables(filters),
        },
      })
    }
  }

  useEffect(() => {
    setCurrentProducts(products)
    setCurrentPageInfo(pageInfo)
    setActiveTermsss(activeTerms)
  }, [categorySlug])

  return (
    <>
      <CatalogOne
        searchData={searchData}
        searchQuery={searchQuery}
        filters={filters}
        setFilters={setFilters}
        category={category}
        categoryBreadcrumb={categoryBreadcrumb}
        colors={activeTermsss?.paColors || []}
        sizes={activeTermsss?.paSizes || []}
        currentProducts={currentProducts.length}
        getFilterParams={getFilterParams}
      />
      <CatalogTwo
        currentProducts={currentProducts}
        currentPageInfo={currentPageInfo}
        loadMore={loadMore}
        loading={loading}
      />
    </>
  )
}
export default CatalogOneTwo

const generateFilterVariables = (filters) => {
  const result = {
    first: 8,
    filters: [],
  }
  if (filters.onSale != null) {
    result.onSale = true
  }
  if (filters.categories && filters.categories.length) {
    result.categories = filters.categories
  }
  if (filters.colors && filters.colors.length) {
    result.filters.push({
      taxonomy: 'PACOLOR',
      terms: Array.isArray(filters.colors) ? filters.colors : [filters.colors],
    })
  }
  if (filters.sizes && filters.sizes.length) {
    result.filters.push({
      taxonomy: 'PASIZE',
      terms: Array.isArray(filters.sizes) ? filters.sizes : [filters.sizes],
    })
  }
  return result
}

function parseQueryOptions(location) {
  const query = queryString.parse(location)
  const optionValues = {}

  if (typeof query.page === 'string') {
    optionValues.page = parseFloat(query.page)
  }
  if (typeof query.limit === 'string') {
    optionValues.limit = parseFloat(query.limit)
  }
  if (typeof query.sort === 'string') {
    optionValues.sort = query.sort
  }

  return optionValues
}

function parseQueryFilters(location) {
  const query = queryString.parse(location, { arrayFormat: 'comma' })
  const filterValues = {}

  const multipleFilters = ['categories', 'colors', 'sizes']

  Object.keys(query).forEach((param) => {
    const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/)

    if (!mr) {
      return
    }

    const filterSlug = mr[1]

    if (multipleFilters.includes(filterSlug) && !Array.isArray(query[param])) {
      filterValues[filterSlug] = [query[param]]
    } else {
      filterValues[filterSlug] = query[param]
    }
  })

  return filterValues
}

function parseQuery(location) {
  return [parseQueryOptions(location), parseQueryFilters(location)]
}

function buildQuery(options, filters) {
  const params = {}

  if (options.page !== 1) {
    params.page = options.page
  }

  if (options.limit !== 10) {
    params.limit = options.limit
  }

  if (options.sort !== 'default') {
    params.sort = options.sort
  }

  Object.keys(filters)
    .filter((x) => !!filters[x])
    .forEach((filterSlug) => {
      params[`filter_${filterSlug}`] = filters[filterSlug]
    })

  return queryString.stringify(params, { encode: false, arrayFormat: 'comma' })
}

function init() {
  const [options, filters] = parseQuery(
    typeof window !== 'undefined' ? window.location.search : ''
  )

  return { options, filters }
}

export const catalog = {
  parseQueryOptions,
  parseQueryFilters,
  parseQuery,
  buildQuery,
  init,
}
