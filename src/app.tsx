import styled from 'styled-components'
import { format } from 'date-fns'

import { Filters } from './filters/filters'
import { useFilters } from './filters/filters.store'

export function App() {
  const [{ fromDate, toDate }] = useFilters()

  const formatted = {
    fromDate: format(fromDate, 'dd/MM/yyyy HH:mm'),
    toDate: format(toDate, 'dd/MM/yyyy HH:mm'),
  }

  return (
    <>
      <Header>
        <Filters />
      </Header>

      <main>
        <pre>{JSON.stringify(formatted, null, 2)}</pre>
      </main>
    </>
  )
}

const Header = styled.header`
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
`
