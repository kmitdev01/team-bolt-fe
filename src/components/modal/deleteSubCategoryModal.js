import React from "react";
import { Modal } from "reactstrap";

const DeleteSubCategoryModal = ({ modal, toggle,deleteClick }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={"full-modal"}>
        <div className="model_background">
          <button className="close_category" onClick={() => toggle()}>
            <i className="fa fa-window-close"></i>
          </button>
          <div className="category_title">
            <div className="deleteIcon">
              <i class="fas fa-trash-alt"></i>
            </div>
            <h5 className="add_category_form" style={{ fontSize: 20 }}>
              Are you sure you would like to
              <br /> delete this sub Category?
              {/* Add Category */}
            </h5>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => toggle()}>Cancel</button>
              <button onClick={deleteClick}>Confirm</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteSubCategoryModal;
