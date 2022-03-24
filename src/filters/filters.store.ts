import {
  createStore,
  createHook,
  Action,
  defaults,
  createContainer,
  ContainerComponent,
} from 'react-sweet-state'
import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  startOfDay,
  subDays,
} from 'date-fns'
import {
  persistToLocalStorage,
  persistToSessionStorage,
} from './filters.middleware'
import type { State } from './filters.types'
import { getInitialState } from './filters.utils'

type Actions = typeof actions

defaults.middlewares.add(persistToLocalStorage)
defaults.middlewares.add(persistToSessionStorage)

const actions = {
  setDaily:
    (): Action<State> =>
    ({ setState }) => {
      setState({
        type: 'DAILY',
        to: 0,
        duration: 1,
      })
    },

  set7Days:
    (): Action<State> =>
    ({ setState }) => {
      setState({
        type: '7_DAYS',
        to: 0,
        duration: 7,
      })
    },

  set28Days:
    (): Action<State> =>
    ({ setState }) => {
      setState({
        type: '28_DAYS',
        to: 0,
        duration: 28,
      })
    },

  setAllTime:
    ({ oldestDate }: { oldestDate: Date }): Action<State> =>
    ({ setState }) => {
      const now = new Date()
      const duration = eachDayOfInterval({ start: oldestDate, end: now }).length

      setState({
        type: 'ALL_TIME',
        from: oldestDate,
        duration,
      })
    },

  setRange:
    ({ from, to }: { from: Date; to: Date }): Action<State> =>
    ({ setState }) => {
      const duration = eachDayOfInterval({ start: from, end: to }).length

      setState({
        type: 'RANGE',
        from,
        to,
        duration,
      })
    },

  setPrevious:
    (): Action<State> =>
    ({ getState, setState }) => {
      const state = getState()
      switch (state.type) {
        case 'DAILY':
        case '7_DAYS':
        case '28_DAYS':
          setState({
            to: state.to - state.duration,
          })
          break

        case 'RANGE':
          setState({
            from: subDays(state.from, state.duration),
            to: subDays(state.to, state.duration),
          })
          break

        default:
          break
      }
    },

  setNext:
    (): Action<State> =>
    ({ getState, setState }) => {
      const state = getState()
      switch (state.type) {
        case 'DAILY':
        case '7_DAYS':
        case '28_DAYS':
          setState({
            to: state.to + state.duration,
          })
          break

        case 'RANGE':
          setState({
            from: addDays(state.from, state.duration),
            to: addDays(state.to, state.duration),
          })
          break

        default:
          break
      }
    },
}

const Store = createStore<State, Actions>({
  initialState: getInitialState(),
  actions,
  name: 'filters',
})

export const FiltersContainer: ContainerComponent<{ key: string }> =
  createContainer(Store, {
    onInit:
      () =>
      ({ setState }) => {
        setState(getInitialState())
      },
  })

export const useFilters = createHook(Store, {
  selector: state => {
    const now = new Date()

    switch (state.type) {
      case 'DAILY':
      case '7_DAYS':
      case '28_DAYS':
        const toDate = addDays(now, state.to)
        const fromDate = subDays(toDate, state.duration - 1)

        return {
          fromDate: startOfDay(fromDate),
          toDate: endOfDay(toDate),
        }

      case 'ALL_TIME':
        return {
          fromDate: startOfDay(state.from),
          toDate: endOfDay(now),
        }

      case 'RANGE':
        return {
          fromDate: startOfDay(state.from),
          toDate: endOfDay(state.to),
        }
    }
  },
})

export const useFiltersType = createHook(Store, {
  selector: state => state.type,
})

export const useIsAllTime = createHook(Store, {
  selector: state => state.type === 'ALL_TIME',
})

export const useIsCurrentRelative = createHook(Store, {
  selector: state => {
    const isRelative =
      state.type === 'DAILY' ||
      state.type === '7_DAYS' ||
      state.type === '28_DAYS'
    return isRelative && state.to === 0
  },
})
