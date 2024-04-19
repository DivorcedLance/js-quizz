import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { type Question } from '../types.d'
import { persist, devtools } from 'zustand/middleware'

interface State {
  reset: () => void
  goPreviousQuestion: () => void
  goNextQuestion: () => void
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      newQuestions[questionIndex] = { ...questionInfo, userSelectedAnswer: answerIndex, isCorrectUserAnswer }
      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },

    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }

  }
}, { name: 'questions' })))
