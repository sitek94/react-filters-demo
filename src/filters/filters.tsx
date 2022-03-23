import * as React from 'react'
import styled from 'styled-components'
import { DateRange } from 'react-date-range'

import { useFilters } from './filters.store'
import { subYears } from 'date-fns'

const OLDEST_DATE = subYears(new Date(), 1)

export function Filters() {
  const [{ fromDate, toDate }, actions] = useFilters()

  const onStepperBackward = () => {}
  const onStepperForward = () => {}

  const onDailySelect = () => actions.setRelative({ from: 0, to: 0 })
  const on7DaysSelect = () => actions.setRelative({ from: -7, to: 0 })
  const on28DaysSelect = () => actions.setRelative({ from: -28, to: 0 })
  const onAllTimeSelect = () => actions.setAllTime({ oldestDate: OLDEST_DATE })

  const onDateRangeChange = ({ selection }: any) => {
    actions.setRange({
      from: selection.startDate,
      to: selection.endDate,
    })
  }

  return (
    <Wrapper>
      <Stepper>
        <Button>←</Button>
        <StepperDate>15/03 - Today</StepperDate>
        <Button>→</Button>
      </Stepper>

      <Buttons>
        <Button onClick={onDailySelect}>Daily</Button>
        <Button onClick={on7DaysSelect}>7 Days</Button>
        <Button onClick={on28DaysSelect}>28 Days</Button>
        <Button onClick={onAllTimeSelect}>All Time</Button>
      </Buttons>

      <DateRangeWrapper>
        <DateRange
          ranges={[{ startDate: fromDate, endDate: toDate, key: 'selection' }]}
          onChange={onDateRangeChange}
          retainEndDateOnFirstSelection={true}
        />
      </DateRangeWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;

  gap: 1rem;
`

const Stepper = styled.div`
  display: flex;
  gap: 0.5rem;
`

const StepperDate = styled.div`
  font-weight: 500;
`

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  border: 1px solid #333;
  background: none;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
`

const DateRangeWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
