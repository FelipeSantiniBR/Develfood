import React from "react";

import { GrLinkNext } from "react-icons/gr";
import "../../styles/status.scss";

class CardStatus extends React.Component {
  render() {
    const { order, type, onChange = () => {} } = this.props;
    return (
      <>
        <div className={"card card-" + type.toLowerCase()}>
          {order.pedidoPratos.map((prato) => {
            return (
              <>
                <p className="nameOrder">{prato.nomePrato}</p>
                <p className="amountOrder">Qtd: {prato.quantidade}</p>
                <p className="obsOrder">Observações: {prato.observacao}</p>
              </>
            );
          })}
          <div
            className="btn-next"
            type="button"
            onClick={() => onChange(order)}
          >
            <GrLinkNext />
          </div>
        </div>
      </>
    );
  }
}

export default CardStatus;
