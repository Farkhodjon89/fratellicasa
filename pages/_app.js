import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
import { store } from '../redux/store'
import Router from 'next/router'
import NProgress from 'nprogress'
import React, { useEffect, useReducer, createContext } from 'react'
import '../styles/globals.css'
import { HeadData } from '../components/Head'

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UZ':
      return {
        ...state,
        currency: 'UZ',
      }
    case 'USD':
      return {
        ...state,
        currency: 'USD',
      }
    default:
      return state
  }
}

Router.onRouteChangeStart = () => NProgress.start()

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

if (process.browser) {
  const hours = 6
  const now = Date.now()
  const setupTime = localStorage.getItem('version')
  if (setupTime == null) {
    localStorage.removeItem('persist:nextjs')
    localStorage.setItem('version', now)
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.removeItem('persist:nextjs')
    localStorage.setItem('version', now)
  }
}

export const Context = createContext({
  state: {
    currency: 'UZ',
  },
  dispatch: () => null,
})

const App = ({ Component, pageProps }) => {
  const store = useStore()
  const [state, dispatch] = useReducer(
    reducer,
    (process.browser && JSON.parse(localStorage.getItem('currency'))) || {
      currency: 'UZ',
    }
  )
  useEffect(() => {
    process.browser && localStorage.setItem('currency', JSON.stringify(state))
  }, [state])

  return (
    <>
      {/* <HeadData />
      <PersistGate persistor={store.__persistor} loading={null}>
        {() => (
          <Context.Provider value={[state, dispatch]}>
            <Component {...pageProps} />
          </Context.Provider>
        )}
      </PersistGate> */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>Скоро вернемся</h1>
      </div>
    </>
  )
}

export default store.withRedux(App)
