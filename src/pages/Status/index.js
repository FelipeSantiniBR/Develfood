import React from "react";
import Header from "../../components/Header";
import "../../styles/status.scss";
import { buscaPedido, alteraStatus } from "../../services/status";
import CardStatus from "./CardStatus";
import CardDelete from "./CardDelete";

class Status extends React.Component {
  state = {
    menuOpen: false,
    orders: [],
    name: "",
    amount: "",
    obs: "",
  };

  componentDidMount() {
    this.getPedidos();
  }

  getPedidos() {
    buscaPedido().then((result) => {
      this.setState({ orders: result.data.content });
    });
  }

  onChangeStatus = (order) => {
    alteraStatus(order.idPedido).then((success) => {
      this.getPedidos();
    });
  };

  render() {
    const { menuOpen, orders } = this.state;

    return (
      <>
        <Header
          title="Status de Pedidos"
          toogleOpen={(open) => {
            this.setState({ menuOpen: open });
          }}
        />
        <div className={"status " + (menuOpen ? "menu-open" : "")}>
          <div className="column">
            <h2 className="title title-aberto">Em Aberto</h2>
            {orders
              .filter((order) => order.statusDoPedido === "ABERTO")
              .map((order) => {
                return (
                  <CardStatus
                    order={order}
                    type={order.statusDoPedido}
                    onChange={this.onChangeStatus}
                  />
                );
              })}
          </div>
          <div className="column">
            <h2 className="title title-preparo">Em Preparo</h2>
            {orders
              .filter((order) => order.statusDoPedido === "EM_PREPARO")
              .map((order) => {
                return (
                  <CardStatus
                    order={order}
                    type={order.statusDoPedido}
                    onChange={this.onChangeStatus}
                  />
                );
              })}
          </div>
          <div className="column">
            <h2 className="title title-pronto">Pronto</h2>
            {orders
              .filter((order) => order.statusDoPedido === "PRONTO")
              .map((order) => {
                return (
                  <CardStatus
                    type={order.statusDoPedido}
                    order={order}
                    onChange={this.onChangeStatus}
                  />
                );
              })}
          </div>
          <div className="column">
            <h2 className="title title-entrega">Saiu para Entrega</h2>
            {orders
              .filter((order) => order.statusDoPedido === "SAIU_PARA_ENTREGA")
              .map((order) => {
                return (
                  <CardStatus
                    type={order.statusDoPedido}
                    order={order}
                    onChange={this.onChangeStatus}
                  />
                );
              })}
          </div>
          <div className="column">
            <h2 className="title title-finalizada">Entregue</h2>
            {orders
              .filter((order) => order.statusDoPedido === "ENTREGUE")
              .map((order) => {
                return (
                  <CardDelete
                    type={order.statusDoPedido}
                    order={order}
                    onChange={this.onChangeStatus}
                  />
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default Status;
