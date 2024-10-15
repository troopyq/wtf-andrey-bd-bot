import { Button, Flex, Image, notification, Space } from "antd"
import { IPropsStep } from "./types"
import { Wrapper } from "./Wrapper"
import { useCallback, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { shuffle } from "../utils";
import { equals } from "ramda";
import "./style.css";

const tg = WebApp;

const MAX_ERRORS = 2;

let TICKETS = [
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n16_6.jpg',
    rightAnswerId: 1,
    title: 'Как следует поступить водителю при переключении такого сигнала светофора?',
    questions: [
      '1. При включении красного сигнала повернуть направо, уступая дорогу другим участникам движения.',
      '2. При включении зеленого сигнала продолжить движение только направо.',
      '3. Указанные действия являются правильными в обоих случаях.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n16_9.jpg',
    rightAnswerId: 2,
    title: 'Можно ли Вам на перекрестке выполнить разворот, двигаясь задним ходом?',
    questions: [
      '1. Можно.',
      '2. Можно, если при этом не будут созданы помехи другим участникам движения.',
      '3. Нельзя.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n17_11.jpg',
    rightAnswerId: 2,
    title: 'Можно ли Вам начать обгон в населенном пункте?',
    questions: [
      '1. Можно.',
      '2. Можно, если обгон будет завершен до переезда.',
      '3. Нельзя.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n17_14.jpg',
    rightAnswerId: 0,
    title: 'Вы намерены повернуть налево. Ваши действия?',
    questions: [
      '1. Уступите дорогу обоим грузовым автомобилям.',
      '2. Выехав на перекресток, уступите дорогу встречному грузовому автомобилю и завершите поворот.',
      '3. Проедете перекресток первым.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/no_picture.png',
    rightAnswerId: 1,
    title: 'На какой срок может быть наложен кровоостанавливающий жгут?',
    questions: [
      '1. Не более получаса в теплое время года и не более одного часа в холодное время года.',
      '2. Не более одного часа в теплое время года и не более получаса в холодное время года.',
      '3. Время наложения жгута не ограничено.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n30_10.jpg',
    rightAnswerId: 1,
    title: 'В данной ситуации Вам разрешается движение:',
    questions: [
      '1. Только по правой полосе.',
      '2. По правой или средней полосе.',
      '3. По любой полосе.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n18_3.jpg',
    rightAnswerId: 0,
    title: 'Разрешено ли Вам ставить автомобиль на стоянку в этом месте по четным числам месяца?',
    questions: [
      '1. Разрешено.',
      '2. Разрешено только после 21 часа.',
      '3. Запрещено.'
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/no_picture.png',
    rightAnswerId: 0,
    title: 'Запрещается эксплуатация мототранспортных средств (категории L), если остаточная глубина рисунка протектора шин (при отсутствии индикаторов износа) составляет не более:',
    questions: [
      '1. 0,8 мм.',
      '2. 1,0 мм.',
      '3. 1,6 мм.',
      '3. 2,0 мм.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n28_15.jpg',
    rightAnswerId: 0,
    title: 'Вы намерены развернуться. Кому Вам необходимо уступить дорогу?',
    questions: [
      '1. Только грузовому автомобилю.',
      '2. Только легковому автомобилю.',
      '3. Обоим транспортным средствам.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n34_12.jpg',
    rightAnswerId: 2,
    title: 'Водители каких автомобилей нарушили правила остановки?',
    questions: [
      '1. Только автомобиля А.',
      '2. Автомобилей А и Б.',
      '3. Автомобилей А и В.',
      '4. Всех автомобилей.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n33_9.jpg',
    rightAnswerId: 3,
    title: 'Можно ли Вам выполнить разворот?',
    questions: [
      '1. Можно.',
      '2. Можно только по траектории А.',
      '3. Можно только по траектории Б.',
      '4. Нельзя.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n38_5.jpg',
    rightAnswerId: 0,
    title: 'Разрешается ли Вам остановка в этом месте?',
    questions: [
      '1. Разрешается.',
      '2. Разрешается только с заездом на тротуар.',
      '3. Разрешается, если при этом не будут созданы помехи маршрутным транспортным средствам.',
      '4. Запрещается.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n8_10.jpg',
    rightAnswerId: 2,
    title: 'Вне населенных пунктов Вам можно продолжить движение:',
    questions: [
      '1. По любой полосе.',
      '2. По правой или средней полосе.',
      '3. Только по правой полосе.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/no_picture.png',
    rightAnswerId: 1,
    title: 'Запрещается эксплуатация легкового автомобиля, если стояночная тормозная система не обеспечивает неподвижное состояние автомобиля в снаряженном состоянии на уклоне:',
    questions: [
      '1. До 16% включительно.',
      '2. До 23% включительно.',
      '3. До 31% включительно.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n5_12.jpg',
    rightAnswerId: 1,
    title: 'Кто из водителей нарушил правила стоянки?',
    questions: [
      '1. Оба.',
      '2. Только водитель автомобиля А.',
      '3. Только водитель автомобиля Б.',
      '4. Никто не нарушил.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/abm/n5_10.jpg',
    rightAnswerId: 2,
    title: 'С какой максимальной скоростью Вы имеете право продолжить движение вне населенных пунктов на легковом автомобиле с прицепом?',
    questions: [
      '1. 50 км/ч.',
      '2. 60 км/ч.',
      '3. 70 км/ч.',
      '4. 80 км/ч.',
      '4. 90 км/ч.',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/no_picture.png',
    rightAnswerId: 3,
    title: 'Какое из следующих действий не является основанием для назначения судебного штрафа?',
    questions: [
      '1. Управление автомобилем с неисправной тормозной системой',
      '2. Превышение скорости на 30 км / ч в населённом пункте',
      '3. Участие в ДТП, если у водителя нет страховки',
      '4. Остановка на тротуаре в ночное время',
    ],
  },
  {
    img: 'https://storage.yandexcloud.net/pddlife/no_picture.png',
    rightAnswerId: 1,
    title: 'Что должен сделать водитель, если он обнаружил, что его тормоза не работают во время движения?',
    questions: [
      '1. Продолжить движение и попытаться остановить машину за счет других механизмов',
      '2. Убедиться в отсутствии других транспортных средств и остановиться на обочине',
      '3. Включить аварийную сигнализацию и ждать помощи',
      '4. Использовать ручной тормоз и пытаться остановиться, не обращая внимания на других участников дорожного движения',
    ],
  },
  {
    img: 'https://eu-central.storage.cloudconvert.com/tasks/49fb4f31-a5fb-4fa0-be65-32336a268355/2024-10-14%2022.26.22.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20241014%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20241014T172650Z&X-Amz-Expires=86400&X-Amz-Signature=b6d1c38b86134bf8d392ff5e0ac371f742a0cf81d92c463448e357512227bded&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%222024-10-14%2022.26.22.jpg%22&response-content-type=image%2Fjpeg&x-id=GetObject',
    rightAnswerId: 3,
    title: 'Когда была сделана эта фотография?',
    questions: [
      '1. 27апр 2020 12:12',
      '2. 29апр 2021 14:44',
      '3. 27апр 2021 15:23',
      '4. 28апр 2021 12:56',
      '5. 28апр 2022 11:22',
    ],
  },
];

const Step7 = ({ onNext }: IPropsStep) => {
  const [ticketId, setTicketId] = useState(0);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [successId, setSuccessId] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [errorsCount, setErrorsCount] = useState(0);

  const [api, contextHolder] = notification.useNotification({ top: 4 });

  useEffect(() => {
    tg.CloudStorage.getItem('errorsCount', (err, res) => res ? setErrorsCount(Number(res)) : null);

    tg.CloudStorage.getItem('ticketId', (err, res) => {
      if (!err || res) {
        setTicketId(Number(res))
      } else {
        tg.CloudStorage.setItem('ticketId', '0')
      }
    })
  }, []);

  useEffect(() => {
    if (!TICKETS[ticketId]) {
      setTicketId(0);
      tg.CloudStorage.setItem('ticketId', '0')
    }
  }, [ticketId]);

  const onClickTicket = useCallback((id: number) => {
    const ticket = TICKETS[ticketId];

    if (disabled) return;

    let nextTicket = ticketId;
    let nextErrorsCount = errorsCount;

    // верный ответ
    if (ticket.rightAnswerId === id) {
      nextTicket = ticketId + 1
      setDisabled(true);
      setSuccessId(id);
      setErrorId(null);
      tg.HapticFeedback.notificationOccurred('success');
      if (TICKETS.length - 1 === ticketId) {
        onNext()
        setTicketId(0);

        tg.CloudStorage.setItem('ticketId', String(0));
        return;
      }
    }

    // неверный ответ
    if (ticket.rightAnswerId !== id) {
      nextTicket = nextTicket + 1;
      nextErrorsCount = nextErrorsCount + 1;
      tg.HapticFeedback.notificationOccurred('error');
      setDisabled(true);
      setSuccessId(null);
      setErrorId(id);
      setErrorsCount(nextErrorsCount)

      if (nextErrorsCount > MAX_ERRORS) {
        nextTicket = 0;
        api.error({ message: 'Ты совсем?) Сначала :D', placement: 'top', duration: 2.5, })
      }
    }

    setTimeout(() => {
      setDisabled(false);
      setSuccessId(null);
      setErrorId(null);
      setTicketId(nextTicket);

      tg.CloudStorage.setItem('ticketId', String(nextTicket));
      if (nextErrorsCount > MAX_ERRORS) {
        TICKETS = shuffle(TICKETS)
        setErrorsCount(0)
        tg.CloudStorage.setItem('errorsCount', String(0))
      }
    }, 1000);
  }, [api, disabled, errorsCount, onNext, ticketId])

  if (!TICKETS[ticketId]) { return null }

  const { title, img, questions = [] } = TICKETS[ticketId] ?? {}

  return <Wrapper>
    {contextHolder}
    <div>
      <Flex justify="space-between">
        <h5>Вопрос: {ticketId + 1} из {TICKETS.length}</h5>
        <h5>Ошибок: {errorsCount} из {MAX_ERRORS}</h5>
      </Flex>
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      <Image style={{ marginBottom: '24px' }} preview={false} width='100%' src={img} />
      <Space style={{ width: '100%' }} direction="vertical">
        {questions.map((el, id) => <Button style={{
          textWrap: 'wrap', height: 'fit-content', width: '100%', textAlign: 'left', placeContent: 'start'
        }}
          className='btnaa'
          type='text'
          variant={equals(errorId, id) || equals(successId, id) ? 'solid' : 'outlined'}
          color={equals(errorId, id) ? 'danger' : equals(successId, id) ? 'primary' : 'default'}
          onClick={() => onClickTicket(id)}>{el}</Button>)}
      </Space>
    </div>

  </Wrapper>
}

export default Step7