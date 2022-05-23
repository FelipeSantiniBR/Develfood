import { Modal, Typography, Box } from "@material-ui/core";
import React from "react";
import "../styles/deleteModal.scss"

class ModalDelete extends React.Component {
  state = {};

  render() {
    const { onClose, onDelete } = this.props;

    return (
      <Modal
        open
        onClose={() => onClose()}
        aria-labelledby="modalTitle"
        aria-describedby="modal-description"
      >
        <div className="scroll-content">
          <Box className="modalBox">
            <Typography className="modalTitle" variant="h6" component="h2">
              Você tem certeza que deseja deletar este prato?
            </Typography>
            <button className="buttonDelModal" onClick={() => onDelete()}>
                Deletar
            </button>
            <button className="ButtonCancelModal" onClick={() => onClose()}>
                Cancelar
            </button>
          </Box>
        </div>
      </Modal>
    );
  }
}

export default ModalDelete;
