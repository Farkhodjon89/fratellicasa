import s from './header.module.scss'
import HeaderTop from '../header-top'
import HeaderBottom from '../header-bottom'
import {Provider} from "react-redux";

const Header = ({ category, openCart, setOpenCart }) => (
  <>
    <HeaderTop />
    <HeaderBottom category={category} openCart={openCart} setOpenCart={setOpenCart} />
  </>
)
export default Header
