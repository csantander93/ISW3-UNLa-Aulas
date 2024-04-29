import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // Importa los íconos
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUsers } from "../contexts/UserContext/useUsers";
import GlobalStyles from "./GlobalStyles";
import PrincipalBox from "./PrincipalBox";

const IconViewPass = styled(FaRegEyeSlash)`
  position: absolute;
  top: 30%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover {
    border-radius: 5px;
    background-color: #D6D6D6;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px 20px;
  background-color: #900c0c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff5a5a;
  }
  &:active {
    background-color: #ff5a5a;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #900c0c;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  &:focus {
    border-color: blue;
    outline: none;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const FormDiv = styled.div`
  padding: 40px;
`;

const DEFAULT_FORM = { // Limpiar el formulario
  usuario: '',
  password: '',
  nombre: '',
  apellido: '',
  email: '',
}
function Register() {
  const { signUp } = useUsers();
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [enviandoPeticion, setEnviandoPeticion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviandoPeticion(true);
    const response = await signUp(formData);
    response && setFormData(DEFAULT_FORM);
  };

  return (
    <>
      <PrincipalBox>
        <GlobalStyles />
        <FormDiv>
          <form onSubmit={handleSubmit}>
            <Title>Crear Cuenta</Title>

            <Label>Usuario</Label>
            <Input
              type="text"
              name="usuario"
              placeholder="usuario"
              value={formData.usuario}
              onChange={handleChange}
            />

            <Label>Contraseña</Label>
            <InputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <IconViewPass onClick={handleTogglePasswordVisibility} as={FaRegEye} />
              ) : (
                <IconViewPass onClick={handleTogglePasswordVisibility} />
              )}
            </InputContainer>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              placeholder="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />

            <Label>Apellido</Label>
            <Input
              type="text"
              name="apellido"
              placeholder="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />

            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Button type="submit" disabled={enviandoPeticion}>Enviar</Button>
            <Link to="/login">
              <Button>Volver</Button>
            </Link>
          </form>
        </FormDiv>
      </PrincipalBox>
    </>
  );
}

export default Register;