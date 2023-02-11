import Layout from '../../components/layout'
import CatalogOneTwo from '../../components/catalog-one-two'
import CatalogSale from '../../components/catalog-sale'
import CatalogThree from '../../components/catalog-three'
import client from '../../apollo/apollo-client'
import CATEGORIES from '../../queries/categories'
import PRODUCTS from '../../queries/products'
import { v4 as uuidv4 } from 'uuid'
import { HeadData } from '../../components/Head'

const Catalog = ({
  categories,
  categorySlug,
  products,
  pageInfo,
  saleProducts,
  salePageInfo,
  activeTerms,
}) => {
  let category
  let categoryBreadcrumb
  let seoImage

  const joki = categories[0].node.children.nodes.map(({ slug }) => slug)
  const joki2 = categories[1].node.children.nodes.map(({ slug }) => slug)
  const joki3 = categories[2].node.children.nodes.map(({ slug }) => slug)
  const joki4 = categories[3].node.children.nodes.map(({ slug }) => slug)

  if ([...joki, 'zhenskaya'].includes(categorySlug)) {
    category = categories[0].node.children.nodes
    categoryBreadcrumb = categories[0].node.name
    seoImage =
      categorySlug === 'zhenskaya'
        ? categories[0].node.products.nodes[0].image.sourceUrl
        : categories[0].node.children.nodes.filter(
            (item) => item.slug === categorySlug
          )[0]?.products?.nodes[0]?.image?.sourceUrl
  }
  if ([...joki2, 'muzhskaya', 'bazovye'].includes(categorySlug)) {
    category = categories[1].node.children.nodes
    categoryBreadcrumb = categories[1].node.name
    seoImage =
      categorySlug === 'muzhskaya'
        ? categories[1].node.products.nodes[0].image.sourceUrl
        : categories[1].node.children.nodes.filter(
            (item) => item.slug === categorySlug
          )[0]?.products?.nodes[0]?.image?.sourceUrl
  }
  if ([...joki3, 'devochkam', 'bazovye'].includes(categorySlug)) {
    category = categories[2].node.children.nodes
    categoryBreadcrumb = categories[2].node.name
    seoImage =
      categorySlug === 'devochkam'
        ? categories[2].node.products.nodes[0].image.sourceUrl
        : categories[2].node.children.nodes.filter(
            (item) => item.slug === categorySlug
          )[0]?.products?.nodes[0]?.image?.sourceUrl
  }
  if ([...joki4, 'dom-2', 'bazovye'].includes(categorySlug)) {
    category = categories[3].node.children.nodes
    categoryBreadcrumb = categories[3].node.name
    seoImage =
      categorySlug === 'dom-2'
        ? categories[3].node.products.nodes[0].image.sourceUrl
        : categories[3].node.children.nodes.filter(
            (item) => item.slug === categorySlug
          )[0]?.products?.nodes[0]?.image?.sourceUrl
  }

  return (
    <>
      <HeadData image={seoImage} />
      <Layout key={uuidv4()} category={categories}>
        {categorySlug === 'sale' ? (
          <CatalogSale
            key={categorySlug}
            categorySlug={categorySlug}
            products={saleProducts}
            pageInfo={salePageInfo}
            category={category}
            activeTerms={activeTerms}
          />
        ) : (
          <CatalogOneTwo
            activeTerms={activeTerms}
            key={categorySlug}
            categorySlug={categorySlug}
            products={products}
            pageInfo={pageInfo}
            category={category}
            categoryBreadcrumb={categoryBreadcrumb}
          />
        )}

        <CatalogThree />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const result = await client.query({
    query: CATEGORIES,
  })
  const paths = result.data.productCategories.edges.map((category) => ({
    params: { slug: category.node.slug },
  }))

  const pathsChild = result.data.productCategories.edges
    .map((category) =>
      category.node.children.nodes.map((r) => ({
        params: { slug: r.slug },
      }))
    )
    .reduce((a, b) => a.concat(b), [])

  paths.push(...pathsChild)

  paths.push({ params: { slug: 'sale' } }, { params: { slug: 'bazovye' } })

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const result = await client.query({
    query: CATEGORIES,
  })
  const result2 = await client.query({
    query: PRODUCTS,
    fetchPolicy: 'no-cache',
    variables: { first: 8, categories: [params.slug] },
  })

  const result3 = await client.query({
    query: PRODUCTS,
    variables: { first: 8, onSale: true },
  })

  return {
    props: {
      categories: result.data.productCategories.edges,
      categorySlug: params.slug,
      products: result2.data.products.nodes,
      activeTerms: result2.data.products.activeTerms,
      pageInfo: result2.data.products.pageInfo,
      saleProducts: result3.data.products.nodes,
      salePageInfo: result3.data.products.pageInfo,
    },
    revalidate: 60,
  }
}

export default Catalog
