import React, { createContext, ReactNode, FC } from 'react'

import { CategoryType } from './types'
import { useFetch } from './customHooks/useFetch'

interface ContextType {
  categories: CategoryType[]
  loadingForInitialFetch: boolean
}

const QuizContext = createContext({} as ContextType)

const QuizProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { state, loading: loadingForInitialFetch } = useFetch(
    'https://opentdb.com/api_category.php'
  )

  const categories = state ? state.trivia_categories : []

  return (
    <QuizContext.Provider
      value={{
        categories,
        loadingForInitialFetch,
      }}>
      {children}
    </QuizContext.Provider>
  )
}

export { QuizProvider, QuizContext }
