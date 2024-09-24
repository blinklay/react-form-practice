import styled from "styled-components";

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
`;

const SubmitButton = styled.button`
  color: var(--color-background-secondary);
  background-color: var(--color-text);
  align-self: center;
  padding: 4px 10px;
  font-weight: 600;
  border-radius: 10px;
`;

function App() {
  return (
    <>
      <Form>
        <FormTitle>Register Form</FormTitle>
        <FormRow>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput type="text" id="email" name="email" />
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput type="password" id="password" name="password" />
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="confirm-password">Confirm password</FormLabel>
          <FormInput
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
        </FormRow>

        <SubmitButton>Register</SubmitButton>
      </Form>
    </>
  );
}

export default App;
