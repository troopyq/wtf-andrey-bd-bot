import { Button, Image } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"

const Step2 = ({onNext}: IPropsStep) => {
  return <Wrapper>
   <div>
    <h3>Ладно, шучу :D</h3>
    <Image preview={false} width='100%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnM_DR-ZCrwO0t75iZboXDZ_V_DD--sloI2A&s' />
    <p>Ну а че, пошутить то надо было)))))</p>

   </div>

  <Button size="large" color="primary" variant="filled" onClick={onNext}>Шутник блять...</Button>
</Wrapper>
}

export default Step2