import React from "react";
import { Modal, Typography, Box } from "@material-ui/core";
import InputMask from "react-input-mask";

class ModalEdit extends React.Component {
  state = {
    idPrato: false,
    file: "",
    name: "",
    price: "",
    description: "",
    errors: {},
    priceMask: "R$ 99,99",
    user: false
  };

  componentDidMount () {
    const { dish } = this.props

    if (dish) {
      this.setState({
        idPrato: dish.idPrato,
        name: dish.nomeDoPrato,
        description: dish.descricaoPrato ,
        file: dish.urlFotoDoPrato ,
        price: 'R$ ' + dish.preco.toString().replace('.', ','),
      })
    }
  }

  onEdit = () => {
    const {onEdit} = this.props
    onEdit({...this.state})
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
              Edite seu Prato
            </Typography>
            <h1 className="subtitle">Aqui você pode editar seus pratos.</h1>
            <input
              helperText={errors.name}
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
            />
            <span>{errors.name}</span>
            <InputMask
              mask={priceMask}
              className="input-price"
              value={price}
              type="text"
              required
              placeholder="Digite o preço do seu Prato"
              onChange={(e) => {
                this.setState({ price: e.target.value });
              }}
            />
            <input
              required
              value={file}
              className="input-file"
              type="text"
              onChange={(e) => {
                this.setState({ file: e.target.value });
              }}
              placeholder="Digite o link da imagem do seu Prato"
            ></input>
            <textarea
              className="input-description"
              value={description}
              type="text"
              required
              placeholder="Digite uma descrição para o seu Prato"
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
              maxLength="50"
            ></textarea>

            <button
              className="submit-dish"
              type="submit"
              onClick={(e) => this.onEdit()}
            >
              Editar Prato
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

export default ModalEdit;
