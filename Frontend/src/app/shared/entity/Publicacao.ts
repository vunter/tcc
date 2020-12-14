import { User } from './user';

export class Publicacao {
  id: number;
  autor: User;
  conteudo: string;
  turmaId: number;
  data: string;
  replies: Publicacao[];

  isReplying: boolean = false;
}
