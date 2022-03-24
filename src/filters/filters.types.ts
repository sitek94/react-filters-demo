export type RelativeState =
  | {
      type: 'DAILY'
      to: number
      duration: number
    }
  | {
      type: '7_DAYS'
      to: number
      duration: number
    }
  | {
      type: '28_DAYS'
      to: number
      duration: number
    }

export type AllTimeState = {
  type: 'ALL_TIME'
  from: Date
  duration: number
}

export type RangeState = {
  type: 'RANGE'
  from: Date
  to: Date
  duration: number
}

export type State = RelativeState | AllTimeState | RangeState

export const isRelativeState = (state: State): state is RelativeState =>
  state.type === 'DAILY' || state.type === '7_DAYS' || state.type === '28_DAYS'

export const isAllTimeState = (state: State): state is AllTimeState =>
  state.type === 'ALL_TIME'

export const isRangeState = (state: State): state is RangeState =>
  state.type === 'RANGE'
