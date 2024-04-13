import styled from "styled-components";
import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // Importa los íconos
import PrincipalBox from "./PrincipalBox";
import GlobalStyles from "./GlobalStyles";

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

const SuccessMessage = styled.div`
  color: green;
  text-align: center;
`;

const FormDiv = styled.div`
  padding: 40px;
`;

function Register() {
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
  });

  const [enviandoPeticion, setEnviandoPeticion] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviandoPeticion(true);

    axios.post("http://localhost:8080/usuario/registro", formData)
        .then(response => {
            console.log('¡Datos enviados con éxito!', response.data);
            setRegistroExitoso(true); // Mostrar mensaje de éxito
            setFormData({ // Limpiar el formulario
              usuario: '',
              password: '',
              nombre: '',
              apellido: '',
              email: '',
            });
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        })
        .finally(() => {
            setEnviandoPeticion(false);
        });
  };

  return (
    <>
      <PrincipalBox>
        <GlobalStyles/>
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
              {registroExitoso && <SuccessMessage>¡Registrado correctamente!</SuccessMessage>}
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