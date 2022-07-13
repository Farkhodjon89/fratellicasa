import s from './layout.module.scss'
import Header from '../header'
import Footer from '../footer'

const Layout = ({ children, category, openCart, setOpenCart }) => (
  <>
    <Header category={category} openCart={openCart} setOpenCart={setOpenCart} />
    {children}
    <Footer />
  </>
)
export default Layout
