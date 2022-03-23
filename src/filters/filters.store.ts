import { createStore, createHook, Action } from 'react-sweet-state'
import { addDays, endOfDay, startOfDay, subDays, subYears } from 'date-fns'

type State =
  | {
      type: 'RELATIVE'
      from: number
      to: number
    }
  | {
      type: 'RANGE'
      from: Date
      to: Date
    }
  | {
      type: 'ALL_TIME'
      from: Date
    }

type Actions = typeof actions

const initialState: State = {
  type: 'RELATIVE',
  from: 0,
  to: 0,
}

const actions = {
  setRelative:
    ({ from, to }: { from: number; to: number }): Action<State> =>
    ({ setState }) => {
      setState({
        type: 'RELATIVE',
        from,
        to,
      })
    },
  setRange:
    ({ from, to }: { from?: Date; to?: Date }): Action<State> =>
    ({ setState }) => {
      setState({
        type: 'RANGE',
        from,
        to,
      })
    },
  setAllTime:
    ({ oldestDate }: { oldestDate: Date }): Action<State> =>
    ({ setState }) => {
      setState({
        type: 'ALL_TIME',
        from: oldestDate,
      })
    },
}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name: 'filters',
})

export const useFilters = createHook(Store, {
  selector: state => {
    const now = new Date()

    switch (state.type) {
      case 'RELATIVE':
        const fromDate = addDays(now, state.from)
        const toDate = addDays(now, state.to)

        return {
          fromDate: startOfDay(fromDate),
          toDate: endOfDay(toDate),
        }

      case 'RANGE':
        return {
          fromDate: startOfDay(state.from),
          toDate: endOfDay(state.to),
        }

      case 'ALL_TIME':
        return {
          fromDate: startOfDay(state.from),
          toDate: endOfDay(now),
        }
    }
  },
})
