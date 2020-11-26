import { User } from 'src/app/shared/entity/user';
export class Publicacao {
  id: number;
  autor: User;
  conteudo: string;
  turmaId: number;
  replies: Publicacao[];
}
