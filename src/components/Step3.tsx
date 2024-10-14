import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const Step3 = ({ onNext }: IPropsStep) => {
  return <Wrapper>
    <div>
      <h3>Че?!</h3>
      <Image preview={false} width='100%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNNlLghLqk2toTuIQSJapw7JTMqgH3UH-sg&s' />
      <p>Не <i>"ну ебать..."</i>, а <i>"готов, блять!"</i></p>
    </div>

    <Button size="large" color="primary" variant="filled" onClick={onNext}>Готов, блять! 🫡</Button>
  </Wrapper>
}

export default Step3