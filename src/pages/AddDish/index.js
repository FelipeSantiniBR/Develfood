import React from "react";
import "../../styles/add.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Header from "../../components/Header";
import ModalDish from "../../components/Modal";
import ModalDelete from "../../components/deleteModal";
import ModalEdit from "../../components/editModal";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import {
  buscaPratos,
  adicionar,
  excluirPratos,
  editarPratos,
} from "../../services/dishs";

class AddDish extends React.Component {
  state = {
    menuOpen: false,
    modalOpen: false,
    modalDeleteOpen: false,
    modalEditOpen: false,
    dishs: [],
  };

  componentDidMount() {
    this.getPratos();
  }

  onDelete(values) {
    excluirPratos(values.idPrato).then((success) => {
      this.getPratos();
    });

    this.setState({
      modalDeleteOpen: false,
    });
  }

  onEdit(values) {
    editarPratos(values.idPrato).then((success) => {
      this.getPratos();
    });

    this.setState({
      modalEdit: false,
    });
  }

  getPratos() {
    buscaPratos().then((result) => {
      this.setState({ dishs: result.data.content });
    });
  }

  onSubmit(values) {
    const { name, description, price, file } = values;

    let priceFormatted = parseFloat(price.replace("R$ ", "").replace(",", "."));

    const dish = {
      nomeDoPrato: name,
      descricaoPrato: description,
      urlFotoDoPrato: file,
      preco: priceFormatted,
    };

    this.setState({
      modalOpen: false,
    });

    adicionar(dish).then(() => {
      this.getPratos();
    });
  }

  onEdit = (values) => {
    const { idPrato, name, description, price, file } = values;

    let priceFormatted = parseFloat(price.replace("R$ ", "").replace(",", "."));

    const dish = {
      idPrato,
      nomeDoPrato: name,
      descricaoPrato: description,
      urlFotoDoPrato: file,
      preco: priceFormatted,
    };

    this.setState({
      modalEditOpen: false,
    });

    editarPratos(dish)
      .then(() => {
        this.getPratos();
      })
      .then((success) => {
        toast.success("Editado com sucesso!");
      })
      .catch((error) => {
        toast.error("Não foi possível editar.");
      });
  };

  renderModalEdit() {
    const { modalEditOpen } = this.state;

    if (!modalEditOpen) return "";

    return (
      <>
        <ModalEdit
          onClose={(e) => this.setState({ modalEditOpen: false })}
          dish={modalEditOpen}
          onEdit={this.onEdit}
        />
      </>
    );
  }

  renderModalDelete() {
    const { modalDeleteOpen } = this.state;

    if (!modalDeleteOpen) return "";

    return (
      <>
        <ModalDelete
          onDelete={() => this.onDelete(modalDeleteOpen)}
          onClose={(e) => this.setState({ modalDeleteOpen: false })}
        />
      </>
    );
  }

  renderModal() {
    const { modalOpen } = this.state;

    if (!modalOpen) return "";

    return (
      <>
        <ModalDish
          dish={modalOpen}
          onSubmit={(values) => this.onSubmit(values)}
          onClose={(e) => this.setState({ modalOpen: false })}
        />
      </>
    );
  }

  render() {
    const { menuOpen, dishs } = this.state;

    return (
      <>
        <Header
          title="Cadastro de Pratos"
          toogleOpen={(isOpen) => {
            this.setState({ menuOpen: isOpen });
          }}
        />
        <div className={"container-add " + (menuOpen ? "menu-open" : "")}>
          <button
            className="button-add"
            onClick={() => this.setState({ modalOpen: true })}
          >
            + Adicionar Prato
          </button>
          <div className="dishs">
            {dishs.map((dish, key) => {
              return (
                <div className="item">
                  {dish.urlFotoDoPrato && (
                    <div
                      className="image"
                      style={{
                        backgroundImage: "url('" + dish.urlFotoDoPrato + "')",
                      }}
                    />
                  )}
                  <div className="item-right">
                    <span className="name">{dish.nomeDoPrato}</span>
                    <span className="price">
                      R$: {dish.preco.toString().replace(".", ",")}
                    </span>
                    <span className="description">{dish.descricaoPrato}</span>
                  </div>
                  <div className="actions">
                    <div
                      className="btn btn-edit"
                      onClick={() => this.setState({ modalEditOpen: dish })}
                    >
                      <MdEdit />
                    </div>
                    <div
                      className="btn btn-delete"
                      onClick={() =>
                        this.setState({ modalDeleteOpen: { ...dish, key } })
                      }
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {this.renderModal()}
        {this.renderModalDelete()}
        {this.renderModalEdit()}
      </>
    );
  }
}

export default AddDish;
