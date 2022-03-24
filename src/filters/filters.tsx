import * as React from 'react'
import styled from 'styled-components'
import { DateRange } from 'react-date-range'

import {
  useFilters,
  useFiltersType,
  useIsAllTime,
  useIsCurrentRelative,
} from './filters.store'
import { subYears } from 'date-fns'
import { StepperDate } from './stepper-date'

const OLDEST_DATE = subYears(new Date(), 1)

export function Filters() {
  const [{ fromDate, toDate }, actions] = useFilters()
  const [type] = useFiltersType()
  const [isAllTime] = useIsAllTime()
  const [isCurrentRelative] = useIsCurrentRelative()

  const onStepperBackward = () => actions.setPrevious()
  const onStepperForward = () => actions.setNext()

  const onDailySelect = () => actions.setDaily()
  const on7DaysSelect = () => actions.set7Days()
  const on28DaysSelect = () => actions.set28Days()
  const onAllTimeSelect = () => actions.setAllTime({ oldestDate: OLDEST_DATE })

  const onDateRangeChange = ({ selection }: any) => {
    actions.setRange({
      from: selection.startDate,
      to: selection.endDate,
    })
  }

  const isStepperBackwardDisabled = isAllTime
  const isStepperForwardDisabled = isAllTime || isCurrentRelative

  return (
    <Wrapper>
      <StepperWrapper>
        <Button
          disabled={isStepperBackwardDisabled}
          onClick={onStepperBackward}
        >
          ←
        </Button>
        <StepperDate />
        <Button disabled={isStepperForwardDisabled} onClick={onStepperForward}>
          →
        </Button>
      </StepperWrapper>

      <FiltersButtonsWrapper>
        <Button selected={type === 'DAILY'} onClick={onDailySelect}>
          Daily
        </Button>
        <Button selected={type === '7_DAYS'} onClick={on7DaysSelect}>
          7 Days
        </Button>
        <Button selected={type === '28_DAYS'} onClick={on28DaysSelect}>
          28 Days
        </Button>
        <Button selected={type === 'ALL_TIME'} onClick={onAllTimeSelect}>
          All Time
        </Button>
      </FiltersButtonsWrapper>

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

const StepperWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

const FiltersButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button<{ selected?: boolean }>`
  border: 1px solid var(--gray);
  background: none;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  ${props => props.selected && 'background: var(--blue)'};
  ${props => props.disabled && 'background: var(--gray)'};
`

const DateRangeWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
