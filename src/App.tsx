import FormLayout from "./components/FormLayout";
import React, { useState } from "react";

interface formDataState {
  email: string;
  password: string;
  confirmPassword: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<formDataState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeField = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <FormLayout changeField={changeField} formData={formData} />
    </>
  );
};

export default App;
