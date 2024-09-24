import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { useRef } from "react";

const fieldScheme = yup.object().shape({
  email: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(6, "Ошибка! Минимальная длинна поля - 6 символов!")
    .matches(/@/, 'Неверный формат. Отсутствует символ - "@"')
    .max(20, "Ошибка! Максимальная длинна поля - 20 символов!"),
  password: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(6, "Ошибка! Минимальная длинна поля - 6 символов!")
    .matches(
      /[^a-zA-Z0-9\s].*[^a-zA-Z0-9\s]/,
      "Неверный формат. Пароль должен содержать минимум два спец. символа!"
    )
    .matches(
      /[A-Z].*[A-Z]/,
      "Неверный формат. Пароль должен содержать минимум две заглавные буквы!"
    )
    .max(20, "Ошибка! Максимальная длинна поля - 20 символов!"),
  confirmPassword: yup
    .string()
    .required("Поле обязательно для заполнения")
    .oneOf([yup.ref("password")], "Пароли должны совподать!"),
});

const Form = styled.form`
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  width: 500px;
`;

const ErrorField = styled.div`
  font-size: 14px;
  color: red;
`;

const FormTitle = styled.h1`
  align-self: center;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FormLabel = styled.label`
  font-weight: 700;
`;

const FormInput = styled.input`
  background-color: transparent;
  font-size: 18px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid var(--color-text);
  outline: none;
  color: inherit;
  width: 100%;
`;

interface SubmitButtonProps {
  isdisabled: boolean;
}

const SubmitButton = styled.button<SubmitButtonProps>`
  color: var(--color-background-secondary);
  background-color: var(--color-text);
  align-self: center;
  padding: 4px 10px;
  font-weight: 600;
  border-radius: 10px;
  cursor: ${(props) => (props.isdisabled ? "default" : "pointer")};
  opacity: ${(props) => (props.isdisabled ? "0.5" : "1")};
  user-select: ${(props) => (props.isdisabled ? "none" : "auto")};
`;

interface CleanFieldButtonProps {
  value: boolean;
}

const CleanFieldButton = styled.button<CleanFieldButtonProps>`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  opacity: ${(props) => (props.value ? "0" : "1")};
  visibility: ${(props) => (props.value ? "hidden" : "visible")};
`;

interface formDataState {
  confirmPassword: string;
  email: string;
  password: string;
}

const sendFormData = (formData: formDataState) => {
  console.log(formData);
};

function App() {
  const submitRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<formDataState>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(fieldScheme),
  });

  const handleClick = (fieldName: keyof formDataState) => {
    setValue(fieldName, "");
  };

  const fieldsError = {
    email: errors.email?.message,
    password: errors.password?.message,
    confirmPassword: errors.confirmPassword?.message,
  };

  const checkFields = () => {
    if (
      getValues("email") !== "" &&
      !fieldsError.email &&
      getValues("password") !== "" &&
      !fieldsError.password &&
      getValues("confirmPassword") !== "" &&
      !fieldsError.confirmPassword
    ) {
      submitRef.current?.focus();
      return true;
    }

    return false;
  };

  checkFields();

  return (
    <>
      <Form onSubmit={handleSubmit(sendFormData)}>
        <FormTitle>Register Form</FormTitle>
        <FormRow>
          <FormLabel htmlFor="email">Email</FormLabel>
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <FormInput
              {...register("email")}
              type="text"
              id="email"
              name="email"
            />
            <CleanFieldButton
              value={getValues("email") === ""}
              onClick={() => handleClick("email")}
            >
              X
            </CleanFieldButton>
          </div>

          {fieldsError.email && <ErrorField>{fieldsError.email}</ErrorField>}
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="password">Password</FormLabel>
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <FormInput
              {...register("password")}
              type="password"
              id="password"
              name="password"
            />
            <CleanFieldButton
              value={getValues("password") === ""}
              onClick={() => handleClick("password")}
            >
              X
            </CleanFieldButton>
          </div>

          {fieldsError.password && (
            <ErrorField>{fieldsError.password}</ErrorField>
          )}
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <FormInput
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <CleanFieldButton
              value={getValues("confirmPassword") === ""}
              onClick={() => handleClick("confirmPassword")}
            >
              X
            </CleanFieldButton>
          </div>

          {fieldsError.confirmPassword && (
            <ErrorField>{fieldsError.confirmPassword}</ErrorField>
          )}
        </FormRow>

        <SubmitButton
          isdisabled={
            !!fieldsError.email ||
            !!fieldsError.password ||
            !!fieldsError.confirmPassword
          }
          ref={submitRef}
        >
          Register
        </SubmitButton>
      </Form>
    </>
  );
}

export default App;
