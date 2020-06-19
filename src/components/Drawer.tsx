import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Divider,
} from '@material-ui/core'
import styled from 'styled-components'

import { FilterOptions } from '../types'

interface Props {
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
  showFilter: boolean
}

const DrawerComponent = ({
  setFilterOptions,
  showFilter,
  setShowFilter,
}: Props) => {
  return (
    <Drawer
      anchor='left'
      open={showFilter}
      onClose={() => setShowFilter(false)}>
      <StyledList subheader={<ListSubheader>Difficulty</ListSubheader>}>
        {['all', 'easy', 'medium', 'hard'].map(difficulty => (
          <ListItem button key={difficulty}>
            <ListItemText
              onClick={() =>
                setFilterOptions(prev => {
                  return {
                    ...prev,
                    difficulty,
                  } as FilterOptions
                })
              }
              primary={difficulty}></ListItemText>
          </ListItem>
        ))}
      </StyledList>
      <Divider />
      <StyledList subheader={<ListSubheader>Type</ListSubheader>}>
        {['all', 'multiple', 'boolean'].map(type => (
          <ListItem button key={type}>
            <ListItemText
              onClick={() =>
                setFilterOptions(prev => {
                  return {
                    ...prev,
                    type,
                  } as FilterOptions
                })
              }
              primary={type}></ListItemText>
          </ListItem>
        ))}
      </StyledList>
    </Drawer>
  )
}

const StyledList = styled(List)`
  width: 250px;
`

export default DrawerComponent
