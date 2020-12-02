import { User } from './User';

export class Publicacao {
  id: number;
  autor: User;
  conteudo: string;
  turmaId: number;
  replies: Publicacao[];
}
