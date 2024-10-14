import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"
import WebApp from "@twa-dev/sdk";

const tg = WebApp;

const Step8 = ({ onNext }: IPropsStep) => {


  return <Wrapper>
    <div>
      <h3>Поздравляю, ты успешно сдал тест на дебила! Шутка) На ПДД</h3>
      <Image style={{ marginBottom: 16 }} src='https://eu-central.storage.cloudconvert.com/tasks/babd4a90-f872-4723-959d-d79e2c915756/andrey.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20241013%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20241013T193342Z&X-Amz-Expires=86400&X-Amz-Signature=e8990b00becba2973af92617630df0fb9a3a40ecd9e93c04cd32cae59941a5fd&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22andrey.gif%22&response-content-type=image%2Fgif&x-id=GetObject' />
    </div>

    <Button size="large" color="primary" variant="filled" onClick={() => (onNext(), tg.HapticFeedback.notificationOccurred('warning'))}>Урааа 🥳</Button>
  </Wrapper>
}

export default Step8