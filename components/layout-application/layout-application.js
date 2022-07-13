import HeaderApplication from '../header-application'
import WrapperApplication from '../wrapper-application'
import FooterApplication from '../footer-application'

const LayoutApplication = ({ children, order }) => (
  <>
    <HeaderApplication order={order} />
    <WrapperApplication children={children} order={order} />
    <FooterApplication />
  </>
)
export default LayoutApplication
