import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types.d'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (answerIndex: number) => {
    if (info.userSelectedAnswer == null) return 'transparent'
    if (info.userSelectedAnswer !== answerIndex && info.correctAnswer !== answerIndex) return 'transparent'
    if (info.correctAnswer === answerIndex) {
      return 'green'
    } else {
      return 'red'
    }
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant='h5' component='h2'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={nightOwl}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ bgcolor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems="center" justifyContent="center" spacing={2}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h4" component="h2">
           {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
