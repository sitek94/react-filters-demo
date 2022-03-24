import { Middleware, StoreState } from 'react-sweet-state'
import { State } from './filters.types'
import { isAllTimeState, isRangeState, isRelativeState } from './filters.types'

export const persistToLocalStorage: Middleware =
  (storeState: StoreState<State>) => next => (arg: any) => {
    const result = next(arg)

    const state = storeState.getState()

    if (isRelativeState(state)) {
      localStorage.setItem(
        'filters',
        JSON.stringify({
          type: state.type,
          duration: state.duration,
        }),
      )
    }

    if (isAllTimeState(state)) {
      localStorage.setItem(
        'filters',
        JSON.stringify({
          type: state.type,
          from: state.from,
          duration: state.duration,
        }),
      )
    }

    if (isRangeState(state)) {
      localStorage.setItem(
        'filters',
        JSON.stringify({
          type: state.type,
          from: state.from,
          to: state.to,
          duration: state.duration,
        }),
      )
    }

    return result
  }

export const persistToSessionStorage: Middleware =
  (storeState: StoreState<State>) => next => (arg: any) => {
    const result = next(arg)

    const state = storeState.getState()
    console.log(state)
    if (isRelativeState(state) && state.to < 0) {
      sessionStorage.setItem(
        'filters',
        JSON.stringify({
          type: state.type,
          to: state.to,
        }),
      )
    } else {
      sessionStorage.removeItem('filters')
    }

    return result
  }
