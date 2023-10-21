import { HistoryContainer, HistoryList } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      {/* esse elemento é para tornar responsivo com scrollagem lateral */}
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>resolvendo bugs</td>
              <td>20 minutos</td>
              <td>Há cerca de 1 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Estudando</td>
              <td>30 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Contexto React</td>
              <td>60 minutos</td>
              <td>Há cerca de 1 meses</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
