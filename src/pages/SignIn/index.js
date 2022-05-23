import React from "react";
import novalogo from "../../assets/image/novalogo.png";
import loginImg from "../../assets/image/login.jpg";
import { toast } from "react-toastify";
import "../../styles/login.scss";
import "react-toastify/dist/ReactToastify.css";
import { login, getData } from "../../services/Login";
import Loading from "../../components/loading";

import { IoMail, IoLockClosed } from "react-icons/io5";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { password } = this.state;

    if (password !== prevState.password) {
      this.validatePassword();
    }
  }

  validateEmail() {
    let valid = false;
    const { errors, email } = this.state;

    var re = /\S+@\S+\.\S+/;

    if (re.test(email)) {
      valid = true;
      errors.email = "";
    } else {
      errors.email = "E-mail inválido";
    }

    this.setState({ errors: errors });

    return valid;
  }

  validatePassword() {
    let valid = false;
    const { errors, password } = this.state;

    if (password.length >= 8 && password.length <= 20) {
      valid = true;
      errors.password = "";
    } else {
      errors.password = "A senha deve conter entre 8 e 20 caracteres.";
    }

    this.setState({ errors: errors });

    return valid;
  }

  submit = (e) => {
    const { email, password } = this.state;
    const { history } = this.props;
    e.preventDefault();

    this.setState({ loading: true });

    if (this.validateEmail() && this.validatePassword()) {
      login({ email: email, senha: password })
        .then((success) => {
          localStorage.setItem("token", success.data.jwttoken);
          getData();
          setTimeout(() => {
            toast.success("Login Realizado!");
            history.push("/home");
          }, 3000);
        })
        .catch((error) => {
          toast.error("Falha ao logar. Verifique seus dados!");
          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
        });
    }
  };

  render() {
    const { errors, email, password, submit, loading } = this.state;

    return (
      <div className="container-login">
        <div
          className="left"
          style={{ backgroundImage: "url(" + loginImg + ")" }}
        ></div>
        <div className="right">
          <img src={novalogo} className="image" alt="aaa" />
          <div
            className={"input-id " + (errors.email ? "has-error" : "")}
            onSubmit={(e) => submit(e)}
          >
            <IoMail />
            <input
              error={Boolean(errors.email)}
              helperText={errors.email}
              value={email}
              type="text"
              required
              placeholder="Digite seu E-mail"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              onBlur={() => {
                this.validateEmail();
              }}
            />
            <span>{errors.email}</span>
          </div>
          <div
            className={"input-password " + (errors.password ? "has-error" : "")}
          >
            <IoLockClosed />
            <input
              helperText={errors.password}
              error={Boolean(errors.password)}
              value={password}
              type="password"
              required
              placeholder="Digite sua Senha"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              onBlur={() => {
                this.validatePassword();
              }}
            />
            <span>{errors.password}</span>
          </div>
          <button
            onClick={(e) => this.submit(e)}
            type="submit"
            disabled={
              errors.email || errors.password || Object.keys(errors).length < 2
            }
          >
            Entrar
          </button>
          <a className="register" href="/cadastrar" type="submit">
            Não possui uma conta? Cadastre-se !
          </a>
        </div>
        <Loading show={loading} />
      </div>
    );
  }
}

export default SignIn;
