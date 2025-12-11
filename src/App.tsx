import styled from 'styled-components'
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import { getCurrentPosition, getinitialazedApp, getPossitionError } from './redux/selectors/initialazedSelectors'
import { useSelector } from 'react-redux'
import Loader from './Loader/Loader'
import { useEffect, type FC } from 'react'
import { useAppDispatch } from './redux/store'
import { initiazedAppCreator, type positionErrorsType, type PositionType, } from './redux/initilizedReducer'
import type { DateTime } from './utils/UNIXConverter'
import { getCurrentBgUrl, getDate } from './redux/selectors/foreCasteSelects'


export const AppContainer = () => {
  // Получаем нужные данные
  const initialazed: boolean = useSelector(getinitialazedApp)
  const crd: PositionType = useSelector(getCurrentPosition)
  const dateTime: DateTime = useSelector(getDate)
  const hour: number | null = dateTime.time.hour
  const bgUrl = useSelector(getCurrentBgUrl)
  const positionErrors:positionErrorsType = useSelector(getPossitionError)
  const dispatch = useAppDispatch()
  // инициализируем приложеие
  useEffect(() => {
    dispatch(initiazedAppCreator())
  }, [dispatch])


  return <App
    initialazed={initialazed}
    crd={crd}
    dateTime={dateTime}
    hour={hour}
    bgUrl={bgUrl}
    positionErrors={positionErrors}
  />
}

// Типы пропсов для App
interface AppPropsType {
  initialazed: boolean
  crd: PositionType
  dateTime: DateTime
  hour: number
  bgUrl: string
  positionErrors: positionErrorsType
}

const App: FC<AppPropsType> = ({ initialazed, bgUrl, positionErrors }) => {

  const AppStyle = styled.div`
  border: 0 2px 0 2px solid black;
  max-height: 100vh;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${bgUrl});
    background-size: cover;
    background-position: center;

    backdrop-filter: blur(10px);
    z-index: -1;
  }
`
  const Container = styled.div`
  max-width: 85%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

  if (initialazed) {
    return (
      <AppStyle>
        <Container>
          <Header />
          <Main />
          <Footer />
        </Container>
      </AppStyle>
    )
  } else {
    return <Loader />
  }
}

export default App
