import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const Step2 = ({ onNext }: IPropsStep) => {
  return <Wrapper>
    <div>
      <h3>Знакомься, это Володя!<br /></h3>
      <Image preview={false} src="https://newtambov.ru/storage/taisia/2012/06/900-400x280.jpg" />
      <h4>Сегодня он будет твоим инспектором ПДД</h4>

      <p>А ты чего ждал?! <i>Права заслужить надо...</i></p>
      <p>Готов к испытаниям?)</p>
    </div>

    <Button size="large" color="primary" variant="filled" onClick={onNext}>Ну ебать... 😐</Button>
  </Wrapper>
}

export default Step2