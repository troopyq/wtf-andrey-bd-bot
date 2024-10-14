import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const Step4 = ({ onNext }: IPropsStep) => {
  return <Wrapper>
    <div>
      <h3>Ну вот! Другое дело!</h3>
      <Image preview={false} height='300px' style={{ objectFit: 'contain' }} width='100%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCCxY1b0iHDgt6tlaqzWFqgIYN7iL6NaFnw&s' />
      <p>Тебе предстоит пройти испытание на знание ПДД :D</p>
      <p>Иначе тебя ждет уголовка...</p>
    </div>

    <Button size="large" color="primary" variant="filled" onClick={onNext}>Всмысле уголовка!? ☠️</Button>
  </Wrapper>
}

export default Step4