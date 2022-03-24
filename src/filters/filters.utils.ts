import {
  isAllTimeState,
  isRangeState,
  isRelativeState,
  State,
} from './filters.types'

const defaultState: State = {
  type: '7_DAYS',
  duration: 7,
  to: 0,
}

export function getInitialState() {
  const sessionStorageState = getSessionStorageState()
  const localStorageState = getLocalStorageState()

  const state = {
    ...defaultState,
    ...localStorageState,
    ...sessionStorageState,
  }

  if (isAllTimeState(state)) {
    return {
      ...state,
      from: new Date(state.from),
    }
  }

  if (isRangeState(state)) {
    return {
      ...state,
      from: new Date(state.from),
      to: new Date(state.to),
    }
  }

  if (isRelativeState(state)) {
    return state
  }

  return defaultState
}

function getSessionStorageState() {
  const sessionStorageJson = sessionStorage.getItem('filters')
  if (sessionStorageJson) {
    return JSON.parse(sessionStorageJson)
  }
}

function getLocalStorageState() {
  const localStorageJson = localStorage.getItem('filters')
  if (localStorageJson) {
    return JSON.parse(localStorageJson)
  }
}
