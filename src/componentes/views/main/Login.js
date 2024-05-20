import React, { useState } from 'react';
import { FaLock, FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUsers } from "../../contexts/UserContext/useUsers";
import PrincipalBox from "./PrincipalBox";
import './Login.css'

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

const FormDiv = styled.div`
  padding: 40px;
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

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding-left: 30px;
  &:focus {
    border-color: blue;
    outline: none;
  }
`;

const IconUser = styled(FaRegUser)`
  position: absolute;
  top: 30%;
  left: 10px;
  transform: translateY(-50%);
`;

const IconPassword = styled(FaLock)`
  position: absolute;
  top: 30%;
  left: 10px;
  transform: translateY(-50%);
`;

const IconViewPass = styled(FaRegEyeSlash)`
  position: absolute;
  top: 30%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover {
    border-radius: 5px;
    background-color: #D6D6D6;
  }
`;

const P = styled.p`
  font-size: 1.6rem;
  text-align: center;
`;

const ForgotPasswordLink = styled(Link)`
  text-decoration: none;
  color: #900c0c;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  &:hover {
   color: orange;
  }
`;

function Login() {

  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUsers();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData);
    response && navigate("/home/index");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className='login-view'>
        <PrincipalBox>
          <FormDiv>
            <form onSubmit={handleSubmit}>
              <Title>Bienvenido a UNLa Aulas!</Title>
              <P>Ingresa tus datos para continuar</P>
              <Label>Usuario</Label>
              <InputContainer>
                <IconUser />
                <Input
                  type="text"
                  name="usuario"
                  placeholder=" usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                />
              </InputContainer>

              <Label>Contraseña</Label>
              <InputContainer>
                <IconPassword />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <IconViewPass onClick={handleTogglePasswordVisibility} as={FaRegEye} />
                ) : (
                  <IconViewPass onClick={handleTogglePasswordVisibility} />
                )}
              </InputContainer>

              {/* Enlace para recuperar contraseña  NO FUNCIONA AUN*/}
              <ForgotPasswordLink to="/forgot-password">¿Olvidaste Usuario y/o Contraseña?</ForgotPasswordLink>

              <Button type="submit">Iniciar Sesión</Button>

              <Link to="/register">
                <Button>Crear Cuenta</Button>
              </Link>
            </form>
          </FormDiv>
        </PrincipalBox>

      </section>
    </>
  );
}

export default Login;
