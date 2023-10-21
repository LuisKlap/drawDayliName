import { differenceInSeconds } from "date-fns";
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

// controlled - mantem em tempo real a informaçao do input do usuario guardada no estado da nossa aplicação
// uncontrolled - busca a informaçao somente quando precisamos dela

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
  // tornando o inputs controlled
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>();
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

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

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  //tornando os inputs uncontrolled
  function handleCreateNewCycle(data: NewCycleFormData) {
    if (activeCycle) {
      // Pausar o cronômetro
      clearInterval(interval);
      setIsPaused(true);
    } else {
      const newCycle: Cycle = {
        id: String(new Date().getTime()),
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      };

      setCycles((state) => [...state, newCycle]);
      setActiveCycleId(newCycle.id);
      setAmountSecondsPassed(0);

      const totalSeconds = newCycle.minutesAmount * 60;
      setRemainingTime(totalSeconds);
      setIsPaused(false);

      reset();
    }
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  // a funçao "padStart()" setta o numero de CharacterData(2) e caso tenho menos do que o numero de caracteres permitido, ele completa com um string ('0')
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle && !isPaused) {
      interval = setInterval(() => {
        if (remainingTime > 0) {
          setAmountSecondsPassed(amountSecondsPassed + 1);
          setRemainingTime(remainingTime - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, isPaused, remainingTime, amountSecondsPassed]);

  //todo console.log é duplicado no terminal por conta do <Reac.StricMode></Reac.StricMode> no arquivo main
  console.log(activeCycle);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form
        // adicionando onSubmit no form para tornar um componente uncontrolled
        onSubmit={handleSubmit(handleCreateNewCycle)}
        action=""
      >
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            {...register("task")}
            //verificando o input a cada mudança em tempo real - controlled component
            // onChange={(e) => setTask(e.target.value)}
            // value={task}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={3}
            max={3}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>

          <Separator>:</Separator>

          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountDownButton
          //caso o estado seja alterado, habilita
          disabled={isSubmitDisabled}
          type="submit"
        >
          <Play size={24} />
          Começar
        </StartCountDownButton>
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "Continuar" : "Pausar"}
        </button>
      </form>
    </HomeContainer>
  );
}
