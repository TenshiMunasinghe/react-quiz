import React, { useState, useEffect, memo } from 'react'
import {
  FormControl,
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core'
import styled from 'styled-components'
import shuffle from 'shuffle-array'
import { v4 as uuidv4 } from 'uuid'

import { QuizDataType } from '../types'

interface Props {
  value: QuizDataType
}

const Quiz = memo((props: Props) => {
  const [answers, setAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleChange = (e: any) => {
    setCurrentAnswer(e.target.value)
  }
  const handleDisable = () => {
    setDisabled(true)
  }

  const {
    difficulty,
    correct_answer,
    incorrect_answers,
    question,
    type,
  } = props.value

  useEffect(() => {
    setAnswers(() => {
      return type === 'boolean'
        ? ['True', 'False']
        : shuffle([...incorrect_answers, correct_answer])
    })
    // eslint-disable-next-line
  }, [])

  const isCorrect = correct_answer === currentAnswer

  return (
    <Grid>
      <Typography variant='h6'>{question}</Typography>
      <Difficulty difficulty={difficulty}>Difficulty: {difficulty}</Difficulty>
      <Box component='form' margin={2}>
        <FormControl component='fieldset'>
          <RadioGroup onChange={handleChange} value={currentAnswer}>
            {answers.map(a => (
              <FormControlLabel
                value={a}
                control={
                  <StyledRadio disabled={disabled && currentAnswer !== a} />
                }
                label={a}
                key={uuidv4()}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {currentAnswer !== '' && (
          <ExpansionPanel onClick={handleDisable}>
            <ExpansionPanelSummary>
              <Typography>Answer</Typography>
            </ExpansionPanelSummary>
            <StyledExpansionDetails>
              <Answer isCorrect={isCorrect}>
                {isCorrect ? 'Correct' : 'Wrong'}
              </Answer>
              {type === 'multiple' && (
                <>
                  <Typography variant='subtitle1'>Correct Answer : </Typography>
                  <Typography variant='subtitle2'>{correct_answer}</Typography>
                </>
              )}
            </StyledExpansionDetails>
          </ExpansionPanel>
        )}{' '}
      </Box>
    </Grid>
  )
})

const StyledExpansionDetails = styled(ExpansionPanelDetails)`
  flex-direction: column;
`

const Difficulty = styled.span`
  color: ${({ difficulty }: { difficulty: string }) => {
    switch (difficulty) {
      case 'easy':
        return '#096887'
      case 'medium':
        return `#300b76`
      case 'hard':
        return '#8c0056'
    }
  }};
`

const StyledRadio = styled(Radio)`
  &.MuiRadio-colorSecondary,
  &&.Mui-checked {
    color: #b93097;
  }
`

const Answer = styled.h6`
  font-size: 1.5rem;
  color: ${({ isCorrect }: { isCorrect: boolean }) =>
    isCorrect ? '#00671d' : '#b70063'};
`

export default Quiz
