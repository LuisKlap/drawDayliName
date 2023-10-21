import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  AlignButtons,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountDownButton,
} from "./styles";
import { useEffect, useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  minutesAmount: zod.number().min(3).max(3),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>();
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [nameList, setNameList] = useState<string[]>([
    "Felix",
    "Gabriel",
    "Lauren",
    "Luis",
    "Paulo",
    "Michel",
    "Silas",
    "Carlos",
  ]);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 3,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;

    if (activeCycle && !isPaused) {
      interval = setInterval(() => {
        setAmountSecondsPassed((prevAmount) => prevAmount + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, isPaused]);

  function handleCreateNewCycle() {
    if (nameList.length === 0) {
      alert("A lista de nomes está vazia.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * nameList.length);
    const randomName = nameList[randomIndex];

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: randomName,
      minutesAmount: 3, // 3 minutos por padrão
      startDate: new Date(),
    };

    setNameList((prevNameList) => {
      const updatedNameList = [...prevNameList];
      updatedNameList.splice(randomIndex, 1);
      return updatedNameList;
    });

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  console.log(activeCycle);

  return (
    <HomeContainer>
      <FormContainer>
        <label>Sorteado da vez: {activeCycle?.task}</label>
      </FormContainer>
      <CountDownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountDownContainer>
      <AlignButtons>
        <StartCountDownButton
          disabled={isPaused}
          onClick={() => handleCreateNewCycle()}
        >
          <Play size={24} />
          Começar
        </StartCountDownButton>
        <StartCountDownButton onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "Continuar" : "Pausar"}
        </StartCountDownButton>
      </AlignButtons>
    </HomeContainer>
  );
}
