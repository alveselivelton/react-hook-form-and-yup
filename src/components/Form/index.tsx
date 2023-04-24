import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles.module.css";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório."),
  email: yup.string().email().required("O e-mail é obrigatório."),
  password: yup
    .string()
    .min(8, "Mínimo de 8 caracteres.")
    .required("A senha é obrigatória."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais.")
    .required("A confirmação de senha é obigatória."),
});

type FormData = yup.InferType<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
      <div>
        <label>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Insira seu nome"
            {...register("name")}
          />
          <small>{errors.name?.message}</small>
        </label>
      </div>
      <div>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            placeholder="Insira seu e-mail"
            {...register("email")}
          />
          <small>{errors.email?.message}</small>
        </label>
      </div>
      <div>
        <label>
          <span>Senha</span>
          <input
            type="password"
            placeholder="Insira sua senha"
            {...register("password")}
          />
          <small>{errors.password?.message}</small>
        </label>
      </div>
      <div>
        <label>
          <span>Confirme sua senha</span>
          <input
            type="password"
            placeholder="Insira novamente sua senha"
            {...register("confirmPassword")}
          />
          <small>{errors.confirmPassword?.message}</small>
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
