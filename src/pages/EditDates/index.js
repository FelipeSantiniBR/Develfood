import React from "react";

import { IoMail, IoLockClosed } from "react-icons/io5";
import { AiFillPhone } from "react-icons/ai";

import { FaPlaceOfWorship } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/edit.scss";
import {
  buscarDadosCadastro,
  editarDadosCadastro,
} from "../../services/ediDates";
import Header from "../../components/Header";

class EditDates extends React.Component {
  state = {
    email: "",
    password: "",
    number: "",
    name: "",
    address: "",
    user: false,
    errors: {},
    menuOpen: false,
  };

  componentDidMount() {
    const restaurante = JSON.parse(localStorage.getItem("restaurante"));
    if (restaurante) {
      this.setState({
        name: restaurante.nomeRestaurante,
        email: restaurante.emailRestaurante,
        address: restaurante.endereco,
        number: restaurante.numeroTelefone,
      });
    }
  }

  onChangeDates = (values) => {
    const { idRestaurante, name, email, address, number } = values;

    const restaurante = {
      idRestaurante,
      nomeRestaurante: name,
      emailRestaurante: email,
      endereco: address,
      numeroTelefone: number,
    };
    editarDadosCadastro(restaurante)
      .then((success) => {
        toast.success("Editado com sucesso!");
      })
      .catch((error) => {
        toast.error("Não foi possível editar.");
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { address } = this.state;

    if (address !== prevState.address) {
      this.validateAddress();
    }
  }

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

  render() {
    const { email, number, name, address, errors, menuOpen } = this.state;

    return (
      <>
        <Header
          title="Editar Dados"
          toogleOpen={(isOpen) => {
            this.setState({ menuOpen: isOpen });
          }}
        />
        <div className={"container-edit " + (menuOpen ? "menu-open" : "")}>
          <div className="right">
            <h1 className="title">Edite os dados do seu estabelecimento!</h1>
            <div className={"input-name " + (errors.name ? "has-error" : "")}>
              <FaPlaceOfWorship />
              <input
                error={Boolean(errors.name)}
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
              className={"input-number " + (errors.number ? "has-error" : "")}
            >
              <AiFillPhone />
              <input
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
            <button type="submit" onClick={(e) => this.onChangeDates(e)}>
              Alterar
            </button>
            <a href="/home" className="return">
              <button>Voltar</button>
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default EditDates;
