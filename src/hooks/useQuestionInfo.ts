import { useQuestionsStore } from '../store/questions'

export function useQuestionInfo () {
  const { questions } = useQuestionsStore()

  let correct = 0
  let incorrect = 0
  let notAnswered = 0

  questions.forEach(q => {
    if (q.isCorrectUserAnswer === true) correct++
    else if (q.userSelectedAnswer !== undefined) incorrect++
    else notAnswered++
  })

  return { correct, incorrect, notAnswered }
}
