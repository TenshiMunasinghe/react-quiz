import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Typography } from '@material-ui/core'

import { QuizContext } from '../Context'
import useQuiz from '../customHooks/useQuiz'
import Loading from '../components/Loading'
import Quiz from '../components/Quiz'
import Header from '../components/Header'
import Drawer from '../components/Drawer'

const Quizzes = () => {
  const { id } = useParams()
  const categoryId = parseInt(id)
  const { categories } = useContext(QuizContext)
  const category = categories ? categories.find(c => c.id === categoryId) : null

  const { quiz, loading, setFilterOptions } = useQuiz(categoryId)
  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <>
      {loading && <Loading />}
      {category && (
        <Header
          handleClick={() => setShowFilter(true)}
          categoryName={category.name}
        />
      )}
      <Drawer
        setFilterOptions={setFilterOptions}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />
      <StyledContainer>
        {quiz.length
          ? quiz.map(q => <Quiz key={uuidv4()} value={q} />)
          : !loading && (
              <Typography variant='h4'>Sorry no quizzes :(</Typography>
            )}
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  padding: 5rem 0;
`

export default Quizzes
