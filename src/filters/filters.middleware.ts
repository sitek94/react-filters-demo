import { Middleware, StoreState } from 'react-sweet-state'
import { State } from './filters.types'
import { isAllTimeState, isRangeState, isRelativeState } from './filters.types'

export const persistToLocalStorage: Middleware =
  (storeState: StoreState<State>) => next => (arg: any) => {
    const result = next(arg)

    const state = storeState.getState()

    if (isRelativeState(state) || isAllTimeState(state)) {
      localStorage.setItem(
        'filters',
        JSON.stringify({
          type: state.type,
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
        }),
      )
    }

    return result
  }

export const persistToSessionStorage: Middleware =
  (storeState: StoreState<State>) => next => (arg: any) => {
    const result = next(arg)

    const state = storeState.getState()

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
