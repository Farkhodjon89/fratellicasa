import s from './error-one.module.scss'

const ErrorOne = () => (
  <div className={s.wrapper}>
    <div className={s.error}>404</div>
    <div className={s.text}>Страница не найдена</div>
  </div>
)
export default ErrorOne
