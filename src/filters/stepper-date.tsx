import * as React from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import { useFilters, useFiltersType } from './filters.store'

export function StepperDate() {
  const [type] = useFiltersType()
  const [{ fromDate, toDate }] = useFilters()

  if (type === 'DAILY') {
    return <Wrapper>{format(fromDate, 'dd/MM/yyyy')}</Wrapper>
  }

  return (
    <Wrapper>
      {format(fromDate, 'dd/MM/yyyy')} - {format(toDate, 'dd/MM/yyyy')}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-weight: 500;
`
