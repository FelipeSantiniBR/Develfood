import React from "react";
import { Modal, Typography, Box } from "@material-ui/core";
import InputMask from "react-input-mask";

class ModalDish extends React.Component {
  state = {
    idPrato: false,
    file: "",
    name: "",
    price: "",
    description: "",
    errors: {},
    priceMask: "R$ 99,99",
  };

  validateName = () => {
    let valid = false;
    const { errors, name } = this.state;

    if (name.length >= 1 && name.length <= 15) {
      valid = true;
      errors.name = "";
    } else {
      errors.name = "O nome deve ter no máximo 15 caracteres.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  validatePrice = () => {
    let valid = false;
    const { errors, price } = this.state;
    const priceValid = parseFloat(price.replace("R$ ", "").replace(".", ","));

    if (!isNaN(priceValid) && price.replace("_", "").length === 8) {
      valid = true;
      errors.price = "";
    } else {
      errors.price = "Digite um preço válido.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  validateFile = () => {
    let valid = false;
    const { errors, file } = this.state;

    if (file.length >= 1) {
      valid = true;
      errors.file = "";
    } else {
      errors.file = "Insira um link válido.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  validateDescription = () => {
    let valid = false;
    const { errors, description } = this.state;

    if (description.length >= 10 && description.length <= 200) {
      valid = true;
      errors.description = "";
    } else {
      errors.description = "A descrição deve ter no mínimo 10 caracteres.";
    }

    this.setState({ errors: errors });

    return valid;
  };

  onSubmit() {
    const { onSubmit } = this.props;
    const { name, price, file, description } = this.state;

    const dish = {
      name,
      price,
      description,
      file,
    };

    onSubmit(dish);
  }

  render() {
    const { name, price, description, file, errors, priceMask } = this.state;
    const { onClose } = this.props;
    return (
      <Modal
        open
        onClose={() => onClose()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="scroll-content">
          <Box className="modal-style">
            <Typography className="modal-title" variant="h6" component="h2">
              Cadastre seu Prato
            </Typography>
            <h1 className="subtitle">
              Aqui você pode cadastrar seus pratos, inserindo o nome, preço,
              descrição e uma foto dele.
            </h1>
            <input
              error={Boolean(errors.name)}
              className="input-name"
              value={name}
              type="text"
              required
              placeholder="Digite o nome do seu Prato"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              maxLength="15"
              onBlur={() => {
                this.validateName();
              }}
            />
            <span>{errors.name}</span>
            <InputMask
              error={Boolean(errors.price)}
              mask={priceMask}
              className="input-price"
              value={price}
              type="text"
              required
              placeholder="Digite o preço do seu Prato"
              onChange={(e) => {
                this.setState({ price: e.target.value });
              }}
              onBlur={() => {
                this.validatePrice();
              }}
            />
            <span>{errors.price}</span>
            <input
              error={Boolean(errors.file)}
              required
              value={file}
              className="input-file"
              type="text"
              onChange={(e) => {
                this.setState({ file: e.target.value });
              }}
              placeholder="Digite o link da imagem do seu Prato"
              onBlur={() => {
                this.validateFile();
              }}
            ></input>
            <span>{errors.file}</span>
            <textarea
              error={Boolean(errors.description)}
              className="input-description"
              value={description}
              type="text"
              required
              placeholder="Digite uma descrição para o seu Prato"
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
              maxLength="100"
              onBlur={() => {
                this.validateDescription();
              }}
            ></textarea>
            <span>{errors.description}</span>
            <button
              className="submit-dish"
              type="submit"
              onClick={(e) => this.onSubmit()}
            >
              Cadastrar Prato
            </button>
            <button className="close" onClick={() => onClose()}>
              Voltar
            </button>
          </Box>
        </div>
      </Modal>
    );
  }
}

export default ModalDish;
