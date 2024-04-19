import { Button, Stack } from '@mui/material'
import { useQuestionInfo } from './hooks/useQuestionInfo'
import { useQuestionsStore } from './store/questions'

export function Footer () {
  const { correct, incorrect, notAnswered } = useQuestionInfo()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <div>
      <Stack direction='row' gap={2} alignItems="center" justifyContent="center">
        <p>✅ Correct: {correct}</p>
        <p>❌ Incorrect: {incorrect}</p>
        <p>❓ Not answered: {notAnswered}</p>
      </Stack>
      <Button variant="contained" color="success" onClick={reset} >Reset</Button>
    </div>
  )
}
