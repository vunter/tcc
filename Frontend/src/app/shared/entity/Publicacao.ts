import { User } from './user';

export class Publicacao {
  id: number;
  autor: User;
  conteudo: string;
  turmaId: number;
  replies: Publicacao[];
}
