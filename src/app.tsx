import styled from 'styled-components'
import { format } from 'date-fns'

import { Filters } from './filters/filters'
import { useFilters, FiltersContainer } from './filters/filters.store'

export function App() {
  return (
    <FiltersContainer key="user">
      <Header>
        <Filters />
      </Header>

      <main>
        <StatePreview />
      </main>
    </FiltersContainer>
  )
}

function StatePreview() {
  const [{ fromDate, toDate }] = useFilters()

  const formatted = {
    fromDate: format(fromDate, 'dd/MM/yyyy HH:mm'),
    toDate: format(toDate, 'dd/MM/yyyy HH:mm'),
  }
  return <pre>{JSON.stringify(formatted, null, 2)}</pre>
}

const Header = styled.header`
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
`
