import React, { useState } from "react";
import { Modal } from "reactstrap";
import CustomInput from "../input";
import { toast } from "react-toastify";
import * as API from "../../services/api";

const AddCategoryModal = ({ modal, toggle, fetchData, editData }) => {
  const [categoryName, setCategoryName] = useState(editData?.catName || "");
  const [loading, setLoading] = useState(false);
  const addCategory = async () => {
    setLoading(true);
    const body = {
      catName: categoryName,
    };
    try {
      let result
      if(editData?._id){
        result = await API.editCategory(editData?._id,body);
      }else{
        result = await API.addCategory(body);
      }
      if (result?.Data?._id) {
        toast.success(result?.message);
        toggle();
        fetchData();
      }
      setLoading(false);
    } catch (error) {
      toast.error(error?.data?.messages || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={"full-modal"}>
        <div className="model_background">
          <button className="close_category" onClick={() => toggle()}>
            <i className="fa fa-window-close"></i>
          </button>
          <div className="category_title">
            <h5 className="add_category_form">
              {editData?._id ? "Edit Category" : "Add Category"}
            </h5>
            <form>
              <CustomInput
                placeholder={"Add Category"}
                onChange={(e) => setCategoryName(e?.target?.value)}
                value={categoryName}
              />
              <button onClick={() => addCategory()} disabled={!categoryName || loading}>
               {editData?._id  ? 'Save' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
