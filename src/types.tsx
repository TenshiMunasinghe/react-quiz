export interface QuizDataType {
  category: string
  correct_answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  incorrect_answers: string[]
  question: string
  type: 'multiple' | 'boolean'
}

export interface CategoryType {
  id: number
  name: string
}

export interface FilterOptions {
  difficulty: 'all' | 'easy' | 'medium' | 'hard'

  type: 'all' | 'multiple' | 'boolean'
}

export interface FilterOptions {
  difficulty: 'all' | 'easy' | 'medium' | 'hard'

  type: 'all' | 'multiple' | 'boolean'
}
