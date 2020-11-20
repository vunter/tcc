export class User {
    id: number;
    nome: string;
    user: string;
    password: string;
    email: string;
    matricula: string;
    roles: string;
    cpf: string;

    constructor(formValues?: any) {
      if (formValues) {
      this.id = formValues.id;
      this.nome = formValues.nome;
      this.user = formValues.user;
      this.password = formValues.password;
      this.email = formValues.email;
      this.matricula = formValues.matricula;
      this.cpf = formValues.cpf;
      this.roles = formValues.roles;
      }
    }
 }
