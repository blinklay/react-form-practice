import FormLayout from "./components/FormLayout";
import React, { useState } from "react";
import { formDataState } from "./interfaces/formDataState";

const sendFormData = (formData: formDataState) => {
  console.log("Form Data >>>>> ", formData);
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<formDataState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorState, setErrorState] = useState<formDataState>({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [formSended, setFormSended] = useState<boolean>(false);

  // Функция проверки заполненности полей и отсутствия ошибок
  const checkFields = (): boolean => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    )
      return true;
    if (errorState.email || errorState.password || errorState.confirmPassword)
      return true;

    return false;
  };

  const changeField = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

    let errorMessage = null;
    if (target.name === "confirmPassword") {
      if (!(formData.password === target.value)) {
        errorMessage = "Значение не совпадает с значением поля Пароль!";
      }
    }

    setErrorState({ ...errorState, [target.name]: errorMessage });
  };

  const onBlurField = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    let errorMessage = null;

    if (target.name === "email") {
      if (target.value.length < 6) {
        errorMessage = "Ошибка! Поле менее 6-ти символов!";
      } else if (!/@/.test(target.value)) {
        errorMessage = "Ошибка! В поле отсутствует символ - '@'";
      }
    }

    if (target.name === "password") {
      if (target.value.length < 6) {
        errorMessage = "Ошибка! Поле менее 6-ти символов!";
      } else if (target.value.length > 20) {
        errorMessage = "Ошибка! Поле более 20-ти символов!";
      } else if (!/[A-Z].*[A-Z]/.test(target.value)) {
        errorMessage =
          "Ошибка! Пароль должен содержать минимум две заглавных буквы!";
      } else if (!/[^a-zA-Z0-9\s].*[^a-zA-Z0-9\s]/.test(target.value)) {
        errorMessage =
          "Ошибка! Пароль должен содержать минимум два спец. символа!";
      }
    }

    setErrorState({ ...errorState, [target.name]: errorMessage });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendFormData({
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    setFormSended(true);
  };

  return (
    <>
      <FormLayout
        changeField={changeField}
        formData={formData}
        errorState={errorState}
        onBlurField={onBlurField}
        disabledSubmit={checkFields()}
        setFormData={setFormData}
        setErrorState={setErrorState}
        handleSubmit={handleSubmit}
        formSended={formSended}
      />
    </>
  );
};

export default App;
