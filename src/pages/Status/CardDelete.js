import React from "react";

import { AiFillDelete } from "react-icons/ai";
import "../../styles/status.scss";

class CardDelete extends React.Component {
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
            className="btn-del"
            type="button"
            onClick={() => onChange(order)}
          >
            <AiFillDelete />
          </div>
        </div>
      </>
    );
  }
}

export default CardDelete;
