import React from "react";
import styled from "styled-components";
import { formDataState } from "../interfaces/formDataState";

const Form = styled.form`
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  width: 500px;
  position: relative;
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
  padding: 5px 30px 5px 5px;
  border: none;
  border-bottom: 1px solid var(--color-text);
  outline: none;
  color: inherit;
  width: 100%;
`;

const SubmitButton = styled.button`
  color: var(--color-background-secondary);
  background-color: var(--color-text);
  align-self: center;
  padding: 4px 10px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
`;

interface CleanFieldProps {
  value: string | null;
}

const CleanField = styled.button<CleanFieldProps>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  opacity: ${({ value }) => (value ? "1" : "0")};
  visibility: ${({ value }) => (value ? "visible" : "hidden")};
`;

const ErrorField = styled.div`
  font-size: 14px;
  color: red;
`;

const SuccessMessage = styled.div`
  align-self: center;
  color: green;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

interface IFormLayout {
  changeField: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurField: ({ target }: React.FocusEvent<HTMLInputElement>) => void;
  errorState: formDataState;
  formData: formDataState;
  disabledSubmit: boolean;
  setFormData: (formData: formDataState) => void;
  setErrorState: (formData: formDataState) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formSended: boolean;
}

const FormLayout: React.FC<IFormLayout> = ({
  changeField,
  formData: { email, password, confirmPassword },
  errorState,
  onBlurField,
  disabledSubmit,
  setFormData,
  setErrorState,
  handleSubmit,
  formSended,
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
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
              onChange={changeField}
              onBlur={onBlurField}
              type="text"
              id="email"
              value={email ?? ""}
              name="email"
            />
            <CleanField
              type="button"
              value={email}
              onClick={() => {
                setFormData({ password, confirmPassword, email: "" });
                setErrorState({ ...errorState, email: null });
              }}
            >
              x
            </CleanField>
          </div>
          {errorState.email && <ErrorField>{errorState.email}</ErrorField>}
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
              onBlur={onBlurField}
              onChange={changeField}
              type="password"
              id="password"
              value={password ?? ""}
              name="password"
            />
            <CleanField
              value={password}
              onClick={() => {
                setFormData({ email, confirmPassword, password: "" });
                setErrorState({ ...errorState, password: null });
              }}
              type="button"
            >
              x
            </CleanField>
          </div>

          {errorState.password && (
            <ErrorField>{errorState.password}</ErrorField>
          )}
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="confirm-password">Confirm password</FormLabel>
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <FormInput
              onChange={changeField}
              type="password"
              id="confirm-password"
              value={confirmPassword ?? ""}
              name="confirmPassword"
            />
            <CleanField
              value={confirmPassword}
              onClick={() => {
                setFormData({ email, password, confirmPassword: "" });
                setErrorState({ ...errorState, confirmPassword: null });
              }}
              type="button"
            >
              x
            </CleanField>
          </div>

          {errorState.confirmPassword && (
            <ErrorField>{errorState.confirmPassword}</ErrorField>
          )}
        </FormRow>

        <SubmitButton disabled={disabledSubmit}>Register</SubmitButton>
        {formSended && <SuccessMessage>Форма отправлена!</SuccessMessage>}
      </Form>
    </>
  );
};

export default FormLayout;
