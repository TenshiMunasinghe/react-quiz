import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import { QuizContext } from '../Context'
import Loading from '../components/Loading'

const Home = () => {
  const { categories, loadingForInitialFetch } = useContext(QuizContext)

  return (
    <>
      {!loadingForInitialFetch ? (
        <Wrapper>
          {categories &&
            categories.map(c => (
              <StyledLink to={`/quizzes/${c.id}`} key={uuidv4()}>
                <StyledButton variant='outlined'>{c.name}</StyledButton>
              </StyledLink>
            ))}
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}

const Wrapper = styled.div`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  width: 80%;
  margin: auto;
  justify-content: center;
  align-content: center;
`

const StyledButton = styled(Button)`
  && {
    display: block;
    width: 100%;
    color: #67004a;
    padding: 1rem;
    border-color: #67004a;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default Home
