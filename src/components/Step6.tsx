import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const imgUrl = new URL('../../public/Step6.jpg', import.meta.url).href

const Step2 = ({onNext}: IPropsStep) => {
  return <Wrapper>
   <div>
    <h3>Кароче, рассказываю правила</h3>
    <Image preview={false} width='100%' src={imgUrl} />
    <p>Тебе предстоит пройти 10 вопросов ПДД. Дается максимум 1 ошибка - иначе начнешь заново</p>
    <p>Если пройдешь это испытание - получишь вознаграждение)</p>

   </div>

  <Button size="large" color="primary" variant="filled" onClick={onNext}>Шутник блять...</Button>
</Wrapper>
}

export default Step2