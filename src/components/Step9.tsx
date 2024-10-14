import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"
import WebApp from "@twa-dev/sdk";

const tg = WebApp;

const Step9 = ({ onNext }: IPropsStep) => {
  return <Wrapper>
    <div>
      <h3>В общем, с днюхой тебя, Андрюха!</h3>
      <Image src='https://eu-central.storage.cloudconvert.com/tasks/75683794-50c9-4275-9334-56c270c74eec/2024-10-14%2001.19.21.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20241013%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20241013T202006Z&X-Amz-Expires=86400&X-Amz-Signature=fe12ace568624814a4fa5ecc6e6bdd4ca3ad4eae17fc3670171610e358da2f00&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%222024-10-14%2001.19.21.jpg%22&response-content-type=image%2Fjpeg&x-id=GetObject' />
    </div>
  </Wrapper>
}

export default Step9