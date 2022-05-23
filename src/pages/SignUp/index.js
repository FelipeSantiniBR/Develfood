import React from "react";
import { IoMail, IoLockClosed } from "react-icons/io5";
import novalogo from "../../assets/image/novalogo.png";
import { ToastContainer, toast } from "react-toastify";
import { AiFillPhone } from "react-icons/ai";
import "../../styles/login.scss";
import { FaPlaceOfWorship } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { MdAddAPhoto } from "react-icons/md";
import cadastroImg from "../../assets/image/cadastro.jpg";
import { cadastro } from "../../services/cadastro";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loading";

class SignUp extends React.Component {
  state = {
    logo: "",
    email: "",
    password: "",
    number: "",
    name: "",
    address: "",
    errors: {},
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { address } = this.state;

    if (address !== prevState.address) {
      this.validateAddress();
    }
  }

  validateLogo = () => {
    let valid = false;
    const { errors, logo } = this.state;

    if (logo.length >= 1) {
      valid = true;
      errors.logo = "";
    } else {
      errors.logo = "Insira um link válido.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  validateName = () => {
    let valid = false;
    const { errors, name } = this.state;

    if (name.length >= 1 && name.length <= 50) {
      valid = true;
      errors.name = "";
    } else {
      errors.name = "O nome deve ter no máximo 50 caracteres.";
    }

    this.setState({ errors: errors });

    return valid;
  };

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

    if (password.length > 8 && password.length <= 20) {
      valid = true;
      errors.password = "";
    } else {
      errors.password = "A senha deve conter entre 8 e 20 caracteres.";
    }

    this.setState({ errors: errors });

    return valid;
  }

  validateNumber = () => {
    let valid = false;
    const { errors, number } = this.state;

    if (number.length >= 9) {
      valid = true;
      errors.number = "";
    } else {
      errors.number = "Insira um número de telefone válido.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  validateAddress = () => {
    let valid = false;
    const { errors, address } = this.state;

    if (address.length > 1) {
      valid = true;
      errors.address = "";
    } else {
      errors.address = "Insira um endereço válido.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  submit = (e) => {
    const { email, password, name, number, address, logo } = this.state;
    const { history } = this.props;
    e.preventDefault();

    this.setState({ loading: true });

    if (
      this.validateEmail() &&
      this.validatePassword() &&
      this.validateName() &&
      this.validateNumber() &&
      this.validateAddress() &&
      this.validateLogo()
    ) {
      cadastro({
        emailRestaurante: email,
        senhaRestaurante: password,
        nomeRestaurante: name,
        numeroTelefone: number,
        endereco: address,
        logoRestaurante: logo,
      })
        .then((success) => {
          localStorage.setItem("user", JSON.stringify(success.data.usuario));

          setTimeout(() => {
            history.push("/login");
            toast.success("Cadastro realizado!");
          }, 3000);
        })
        .catch((error) => {
          toast.error(
            "Falha ao cadastrar. Verifique os dados e tente novamente!"
          );
          setTimeout(() => {
            this.setState({ loading: false });
          }, 5000);
        });
    }
  };

  render() {
    const { email, password, number, name, address, errors, loading, logo } =
      this.state;

    return (
      <div className="container-login">
        <div
          className="left"
          style={{ backgroundImage: "url(" + cadastroImg + ")" }}
        ></div>
        <div className="right">
          <img src={novalogo} className="image" />
          <h1 className="title">Cadastre o seu estabelecimento!</h1>
          <div className={"input-logo " + (errors.logo ? "has-error" : "")}>
            <MdAddAPhoto />
            <input
              error={Boolean(errors.logo)}
              helperText={errors.logo}
              value={logo}
              type="text"
              required
              placeholder="Insira o link do logo de seu restaurante"
              onChange={(e) => {
                this.setState({ logo: e.target.value });
              }}
              onBlur={() => {
                this.validateLogo();
              }}
            />
            <span>{errors.logo}</span>
          </div>
          <div className={"input-name " + (errors.name ? "has-error" : "")}>
            <FaPlaceOfWorship />
            <input
              error={Boolean(errors.name)}
              helperText={errors.name}
              value={name}
              type="text"
              required
              placeholder="Digite o nome do estabelecimento"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              onBlur={() => {
                this.validateName();
              }}
            />
            <span>{errors.name}</span>
          </div>
          <div className={"input-id " + (errors.email ? "has-error" : "")}>
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
              minLength="8"
              maxLength="20"
            />
            <span>{errors.password}</span>
          </div>
          <div className={"input-number " + (errors.number ? "has-error" : "")}>
            <AiFillPhone />
            <input
              helperText={errors.number}
              error={Boolean(errors.number)}
              value={number}
              type="text"
              required
              placeholder="Digite o número de telefone"
              onChange={(e) => {
                this.setState({ number: e.target.value });
              }}
              onBlur={() => {
                this.validateNumber();
              }}
              maxLength="11"
            />
            <span>{errors.number}</span>
          </div>
          <div
            className={"input-address " + (errors.address ? "has-error" : "")}
          >
            <SiGooglemaps />
            <input
              helperText={errors.address}
              error={Boolean(errors.address)}
              value={address}
              type="text"
              required
              placeholder="Insira o endereço"
              onChange={(e) => {
                this.setState({ address: e.target.value });
              }}
              onBlur={() => {
                this.validateAddress();
              }}
            />
            <span>{errors.address}</span>
          </div>
          <button
            type="submit"
            onClick={(e) => this.submit(e)}
            disabled={
              errors.email ||
              errors.password ||
              errors.name ||
              errors.number ||
              errors.address ||
              errors.logo ||
              Object.keys(errors).length < 6
            }
          >
            Cadastrar
          </button>
          <a className="register" href="/login" type="submit">
            Já possui uma conta? Faça seu login !
          </a>
        </div>
        <Loading show={loading} />
      </div>
    );
  }
}

export default SignUp;
