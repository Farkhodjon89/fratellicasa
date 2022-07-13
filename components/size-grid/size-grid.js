import s from './size-grid.module.scss'

const SizeGrid = ({ activeStatus, getActiveStatus, product }) => {
  let table = []
  product.productCategory.nodes.map(({ name }) => {
    switch (name) {
      case 'Мужская':
        table = [
          {
            head: 'Худи',
            img: '/product-card/grid1.svg',
            sizes: ['M', 'L', 'XL', '2XL'],
            length: ['71', '72', '73', '75'],
            width: ['55', '58', '59', '62']
          },
          {
            head: 'Свитшот',
            img: '/product-card/grid1.svg',
            sizes: ['M', 'L', 'XL', '2XL'],
            length: ['73', '74', '75', '76'],
            width: ['52', '55', '57', '58']
          },
          {
            head: 'Футболка NOIR',
            img: '/product-card/grid2.svg',
            sizes: ['S', 'M', 'L', 'XL', '2XL'],
            length: ['68', '72', '72', '75', '76'],
            width: ['49', '51', '52', '53', '54']
          },
          {
            head: 'Футболка FC',
            img: '/product-card/grid2.svg',
            sizes: ['S', 'M', 'L', 'XL', '2XL'],
            length: ['66', '68', '68', '70', '72'],
            width: ['48', '52', '52', '54', '56']
          },
          {
            head: 'Пижамные брюки',
            img: '/product-card/grid3.svg',
            sizes: ['M', 'L', 'XL', '2XL'],
            length: ['104', '104', '104', '107'],
            width: ['31', '32', '33', '36']
          }
        ]
        break
      case 'Женская':
        table = [
          {
            head: 'Свитшот обычный',
            img: '/product-card/grid1.svg',
            sizes: ['M', 'L', 'XL'],
            length: ['65', '66', '67'],
            width: ['51', '52', '55']
          },
          {
            head: 'Свитшот удлинённый',
            img: '/product-card/grid1.svg',
            sizes: ['M', 'L', 'XL'],
            length: ['64', '65', '66'],
            width: ['57', '58', '60']
          },
          {
            head: 'Туника',
            img: '/product-card/grid4.svg',
            sizes: ['L', 'XL'],
            length: ['84', '85'],
            width: ['57', '60']
          },
          {
            head: 'Свитшот удлинённый',
            img: '/product-card/grid5.svg',
            sizes: ['M', 'L', 'XL'],
            length: ['66', '67', '69'],
            width: ['55', '57', '59']
          },
          {
            head: 'Брюки',
            img: '/product-card/grid6.svg',
            sizes: ['M', 'L', 'XL', '2XL'],
            length: ['104', '104', '104', '107'],
            width: ['31', '32', '33', '36']
          },
          {
            head: 'Футболка',
            img: '/product-card/grid7.svg',
            sizes: ['S', 'M', 'L', 'XL'],
            length: ['60', '62', '64', '66'],
            width: ['45', '48', '50', '52']
          }
        ]
        break
      case 'Футболки':
        table = [
          {
            head: name,
            img: '/product-card/grid2.svg',
            sizes: product.variations.nodes.map(product => product.attributes.nodes[1].value),
            length: product.variations.nodes.map(product => product.length),
            width: product.variations.nodes.map(product => product.width)
          }
        ]
        break
      case 'Поло':
        table = [
          {
            head: name,
            img: '/product-card/polo.svg',
            sizes: product.variations.nodes.map(product => product.attributes.nodes[1].value),
            length: product.variations.nodes.map(product => product.length),
            width: product.variations.nodes.map(product => product.width)
          }
        ]
        break
      case 'Платья':
        table = [
          {
            head: name,
            img: '/product-card/dress.svg',
            sizes: product.variations.nodes.map(product => product.attributes.nodes[1].value),
            length: product.variations.nodes.map(product => product.length),
            width: product.variations.nodes.map(product => product.width)
          }
        ]
        break

      default:
        break
    }
  })

  return (
    <div className={`${s.wrapper}  ${activeStatus && s.active}`}>
      <div className={s.inner}>
        <div className={s.top}>
          <img src='/product-card/logo.svg' alt='' />
          <button onClick={() => getActiveStatus(false)}>
            <img src='/product-card/close.svg' alt='' />
            ЗАКРЫТЬ ТАБЛИЦУ
          </button>
        </div>
        <div className={s.topMob}>
          <img src='/header/logo.svg' />
          <div className={s.text}>Размерная таблица</div>
          <div className={s.burger} onClick={() => getActiveStatus(false)} />
        </div>
        <div className={s.grid}>
          {table.map((table, i) => (
            <div className={s.block} key={i}>
              <div className={s.head}>
                {table.head}
                <span>Допустима разница в 1-2 см</span>
              </div>
              <div className={s.body}>
                <div className={s.img}>
                  <img src={table.img} alt='' />
                </div>
                <div className={s.mainTable}>
                  <div className={s.table}>
                    {['Размер', ...table.sizes].map((r, i) => (
                      <div key={i}>{r}</div>
                    ))}
                  </div>
                  <div className={s.table}>
                    {['Длина', ...table.length].map((r, i) => (
                      <div key={i}>{r}</div>
                    ))}
                  </div>
                  <div className={s.table}>
                    {['Ширина', ...table.width].map((r, i) => (
                      <div key={i}>{r}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SizeGrid
