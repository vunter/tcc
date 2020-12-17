import { Aula } from './Aula';
import { User } from 'src/app/shared/entity/user';
export class Resposta {
  id: number;
  resposta: string;
  print: string;
  alunoId: number;
  aulaId: number;
  aluno: User;
  aula: Aula;
}
