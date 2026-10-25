import styled from 'styled-components'

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tab = styled.button`
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accentSoft : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.textMuted};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition},
    background ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.text};
  }
`

function Tabs({ items, value, onChange, label }) {
  return (
    <List role="tablist" aria-label={label}>
      {items.map((item) => (
        <Tab
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          $active={item.value === value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </Tab>
      ))}
    </List>
  )
}

export default Tabs