import { Button, Flex, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const imgUrl = new URL('../../public/Step6.jpg', import.meta.url).href

const Step6 = ({ onNext }: IPropsStep) => {
  return <Wrapper>
    <div>
      <h3>Кароче, рассказываю правила</h3>
      <Flex justify="center">
        <Image preview={false} height='240px' src={imgUrl} />
      </Flex>
      <p>Тебе предстоит пройти вопросы по ПДД. Дается максимум 1 ошибка - иначе начнешь заново</p>
      <p>Если пройдешь это испытание - получишь вознаграждение)</p>

    </div>

    <Button size="large" color="primary" variant="filled" onClick={onNext}>Погнали 🤓</Button>
  </Wrapper>
}

export default Step6