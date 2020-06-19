import React, { memo } from 'react'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import { FilterList } from '@material-ui/icons'
import styled from 'styled-components'

interface Props {
  handleClick: () => void
  categoryName: string
}

const Header = memo(({ handleClick, categoryName }: Props) => {
  return (
    <StyledAppBar>
      <StyledToolBar variant='dense'>
        <Title variant='h5'>{categoryName}</Title>
        <StyledButton variant='outlined' onClick={handleClick}>
          <StyledFilterList />
          <ButtonText>Filter</ButtonText>
        </StyledButton>
      </StyledToolBar>
    </StyledAppBar>
  )
})

const StyledAppBar = styled(AppBar)`
  && {
    background: #00671d;
    padding: 0.5rem 0;
  }
`

const StyledToolBar = styled(Toolbar)`
  position: relative;
`

const Title = styled(Typography)`
  && {
    margin-left: 0.5rem;
  }
`

const StyledButton = styled(Button)`
  && {
    border-color: white;
    position: absolute;
    right: 2rem;
    display: flex;
    justify-content: center;

    &:active {
      background: #f1f1f144;
    }
  }
`

const ButtonText = styled.span`
  color: white;
`

const StyledFilterList = styled(FilterList)`
  && {
    fill: white;
  }
`

export default Header
