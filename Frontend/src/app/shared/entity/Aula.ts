import { Bloco } from './Bloco';
import { Turma } from './Turma';
export class Aula {
  id: number;
  dataAula: string;
  duracao: number;
  gabarito: string;
  objetivo: string;
  titulo: string;
  turmaId: number;
  quantidadeMaxBlocos: number;
  finalizada: boolean;

  nomeProfessor: string;
  turma: Turma;
  blocos: Bloco[];
}
