
import { LoadingOutlined } from '@ant-design/icons';
import WebApp from '@twa-dev/sdk'
import { Button, Flex, Skeleton } from 'antd'
import React, { useCallback, useEffect, useState } from 'react';
import { getComponent, STEPS_COUNT } from './steps';
import { IPropsStep } from './components/types';

const tg = WebApp;

tg.MainButton.setText('Получить приз');
tg.MainButton.color = '#3ecd00';
tg.MainButton.textColor = '#ffffff';

tg.expand()
// tg.disableVerticalSwipes()

tg.onEvent('mainButtonClicked', function () {
  tg.sendData("Отлично! Жди свой приз!");
  //при клике на основную кнопку отправляем данные в строковом виде
});

const StepReload = ({ onNext }: IPropsStep) => {

  useEffect(() => {
    tg.CloudStorage.setItem('step', '1')
    onNext?.()
  }, [])

  return <>STEP MAX COUNT ERROR</>
}

function App() {

  const [step, setStep] = useState<number>(0)
  console.log(WebApp.initDataUnsafe)


  useEffect(() => {
    tg.CloudStorage.getItem('step', (err, res) => {
      console.log({ err, res })
      if (err || !res) {
        return tg.CloudStorage.setItem('step', '1')
      }

      if (step > STEPS_COUNT) {
        tg.CloudStorage.setItem('step', '1')
        setStep(1)
        return;
      }

      setStep(Number(res) || 1)

    })

  }, [])

  useEffect(() => {
    if (step === STEPS_COUNT) {
      tg.MainButton.show()
    } else if (tg.MainButton.isActive) {
      tg.MainButton.hide()
    }
  }, [step])

  const onNext = useCallback(() => {
    if (step > STEPS_COUNT) {
      tg.CloudStorage.setItem('step', '1')
      setStep(1)
      return;
    }

    if (step === STEPS_COUNT) return;

    if (!getComponent((step || 1) + 1)) {
      tg.CloudStorage.setItem('step', '1')
      setStep(1)
      return;
    }
    const newStep = (step || 1) + 1;
    tg.CloudStorage.setItem('step', `${newStep}`)
    setStep(newStep)
  }, [step])

  const onClearStep = useCallback(() => {
    tg.CloudStorage.setItem('step', `${1}`)
    setStep(1)
  }, [step])

  const onPrev = useCallback(() => {
    if (step === 1) return;
    tg.CloudStorage.setItem('step', `${step - 1}`)
    setStep(step - 1)
  }, [step])

  if (!step) {
    return <LoadingOutlined />;
  }

  const Step = step <= STEPS_COUNT ? getComponent(step || 1) : StepReload;

  return (
    <Flex vertical style={{ minHeight: '95vh', width: '100%', paddingInline: '24px' }}>
      <Flex style={{ width: '100%' }} justify='space-between' align='center' gap='32px'>
        <h3 >Шаг: {step} из {STEPS_COUNT}</h3>
        {step > 1 && <Button onClick={onClearStep} variant='outlined' style={{ background: 'transparent' }} color='danger'>Рестарт</Button>}
        {step > 1 && <Button onClick={onPrev} variant='text' color='primary'>Назад</Button>}
      </Flex>


      <React.Suspense fallback={<Flex justify='center' align='center' style={{ height: '100vh' }}><Skeleton active style={{ width: '100%', height: '100%' }} /></Flex>}>
        <Step onNext={onNext} />
      </React.Suspense>

    </Flex>
  )
}

export default App
