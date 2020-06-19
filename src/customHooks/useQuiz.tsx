import { useEffect, useState, useRef } from 'react'
import { AllHtmlEntities } from 'html-entities'

import { QuizDataType, FilterOptions } from '../types'

const entities = new AllHtmlEntities()

const useQuiz = (categoryId: number) => {
  const [quiz, setQuiz] = useState<QuizDataType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    difficulty: 'all',
    type: 'all',
  })

  const allQuizzes = useRef<QuizDataType[]>([])

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true)
        const questionCountResponse = await fetch(
          `https://opentdb.com/api_count.php?category=${categoryId}`
        )
        const questionCount = await questionCountResponse.json()

        const allQuizzesResponse = await fetch(
          `https://opentdb.com/api.php?amount=${questionCount.category_question_count.total_question_count}&category=${categoryId}`
        )
        const allQuizzes = await allQuizzesResponse.json()

        const decodedQuiz = await allQuizzes.results.map((q: QuizDataType) => {
          return {
            ...q,
            correct_answer: entities.decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((i: string) =>
              entities.decode(i)
            ),
            question: entities.decode(q.question),
          }
        })

        allQuizzes.current = decodedQuiz
        setQuiz(decodedQuiz)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [categoryId])

  //filter quizzes
  useEffect(() => {
    if (allQuizzes.current.length === 0) return
    const { difficulty, type } = filterOptions
    const filteredQuiz =
      difficulty === 'all' && type === 'all'
        ? allQuizzes.current
        : allQuizzes.current.filter(
            (item: QuizDataType) =>
              (item.difficulty === difficulty || difficulty === 'all') &&
              (item.type === type || type === 'all')
          )
    setQuiz(filteredQuiz)
  }, [filterOptions])

  return { quiz, loading, setFilterOptions }
}

export default useQuiz
