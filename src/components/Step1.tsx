import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const Step1 = ({ onNext }: IPropsStep) => {
  return <Wrapper>
    <div >
      <h2>Ну что, приветствую тебя, Андрюха</h2>
      <Image preview={false} src="https://avatars.mds.yandex.net/get-altay/11047345/2a0000018de04045db78636a56351a7830f9/L_height" />
      <p>Мне тут птичка нашептала, что ты хочешь "сдать" на права? =)</p>
      <p>Хочешь приключения на 5 минут? :D</p>
    </div>
    <Button size="large" color="primary" variant="filled" onClick={onNext}>Хули, давай... 🥲</Button>
  </Wrapper>
}

export default Step1