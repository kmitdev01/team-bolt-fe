import React, { useState } from "react";
import { Modal } from "reactstrap";
import CustomInput from "../input";
import { toast } from "react-toastify";
import * as API from "../../services/api";
import { BASE_URL } from "../../services";

const AddSubCategoryModal = ({
  modal,
  toggle,
  category,
  fetchData,
  editData,
}) => {
  const [image, setImage] = useState(null);
  const [path, setPath] = useState(
    editData?.catImg ? `${BASE_URL}/images/${editData?.catImg}` : null
  );
  const [categoryName, setCategoryName] = useState(editData?.subCatName || null);
  const [isDensity, setDensity] = useState(editData?.density || "");
  const [isPrice, setPrice] = useState(editData?.price || "");
  const [isWeight, setWeight] = useState(editData?.weight || "");
  const [categoryId, setCategoryId] = useState(editData?.parentId || "");
  const [loading, setLoading] = useState(false);

  const disabledData = !isDensity || !isPrice || !isWeight || !categoryName  || !categoryId
  
  const isDisabled = () => {
    return !editData?._id ? !image || loading ||  disabledData : loading ||  disabledData
  }
  const addSubCategory = async () => {
    setLoading(true);
    const body = {
      subCatName: categoryName,
      parentId: categoryId,
      density: isDensity,
      price: isPrice,
      weight: isWeight,
    };
    try {
      let result;
      let imageResult;
      const formData = new FormData();
      if (image) {
        formData.append("catImg", image, image.name);
      }
      if (editData?._id) {
        result = await API.editSubCategory(editData?._id, body);
        if (image) {
          imageResult = await API.addSubCategoryImage(
            result?.Data?._id,
            formData
          );
        }
      } else {
        result = await API.addSubCategory(body);
        if (image) {
          imageResult = await API.addSubCategoryImage(
            result?.Data?._id,
            formData
          );
        }
      }
      if (result?.Data?._id || imageResult?.id) {
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
              {editData?._id ? "Edit Sub Category" : "Add Sub Category"}
            </h5>
            <div className="category_input">
              <div className="upload_btn">
                <button href="#">
                  <input
                    type="file"
                    id="myfile"
                    name="myfile"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setPath(URL.createObjectURL(e.target.files[0]));
                        setImage(e.target.files[0]);
                      }
                    }}
                  />
                  {path ? (
                    <>
                    <img src={path} alt="" className="upload-image" />
                    <p className="replaceButton">Replace Image</p>
                    </>
                  ) : (
                    <>
                      <div className="add_icon">
                        <i className="fas fa-plus"></i>
                      </div>
                      <div className="add_image_text">
                        <span className="add_image_text">Add Image</span>
                      </div>
                    </>
                  )}
                </button>
              </div>
              <div className="dropdown_category">
                <i class="fas fa-angle-down"></i>
                <select
                  className="dropdown_select"
                  onChange={(e) => setCategoryId(e?.target?.value)}
                >
                  <option>
                    {editData?._id
                      ? category?.find((e) => e?._id === editData?.parentId)
                          .catName
                      : "Select Category"}
                  </option>
                  {category?.map((item) => (
                    <option value={item?._id}>{item?.catName}</option>
                  ))}
                </select>
              </div>
              <CustomInput
                placeholder={"Enter Sub Category Name"}
                onChange={(e) => setCategoryName(e?.target?.value)}
                value={categoryName}
              />
              <div className={"inputWrap"}>
                <span>g/cm^3</span>
                <CustomInput
                  placeholder={"Density"}
                  onChange={(e) => setDensity(e?.target?.value)}
                  value={isDensity}
                  type={'number'}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={"inputWrap"} style={{paddingRight:10}}>
                  <span>Rs/Kg</span>
                  <CustomInput
                    placeholder={"Price"}
                    onChange={(e) => setPrice(e?.target?.value)}
                    value={isPrice}
                    type={'number'}
                  />
                </div>
                <div className={"inputWrap"}>
                  <span>Kg</span>
                  <CustomInput
                    placeholder={"Weight"}
                    onChange={(e) => setWeight(e?.target?.value)}
                    value={isWeight}
                    type={'number'}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => addSubCategory()} disabled={isDisabled()}>
              {editData?._id ? "Save" : "Add"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddSubCategoryModal;
