import React, { useEffect, useState } from "react";
import "./style.css";
import { Collapse, Container } from "reactstrap";
import AddCategoryModal from "../../components/modal/addCategoryModal";
import AddSubCategoryModal from "../../components/modal/addSubCategoryModal";
import { Link } from "react-router-dom";
import * as API from "../../services/api";
import { toast } from "react-toastify";
import { BASE_URL } from "../../services";
import DeleteSubCategoryModal from "../../components/modal/deleteSubCategoryModal";

const Dashboard = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState({});
  const [editSubCategoryData, setEditSubCategoryData] = useState({});
  const [deleteSubCategoryModal, setDeleteSubCategoryModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  
  const fetchData = () => {
    getCategory();
  };
  const toggleAddCategoryModal = () => setAddCategoryModal(!addCategoryModal);
  const toggleDeleteSubCategoryModal = () => setDeleteSubCategoryModal(!deleteSubCategoryModal);
  const toggleAddSubCategoryModal = () =>
    setAddSubCategoryModal(!addSubCategoryModal);
  const toggle = (e) => setIsOpen(e);
  const getCategory = async () => {
    setLoading(true);
    try {
      const result = await API.getCategory();
      setCategoryData(result?.data);
      if(result?.data?.length){
        toggle(result?.data[0]?._id)
      }
      setLoading(false);
    } catch (error) {
      toast.error(error?.data?.messages || "Something went wrong");
      setLoading(false);
    }
  };
  const deleteSubCategory = async () => {
    try {
      const result = await API.deleteSubCategory(deleteData?._id);
      toast.success(result?.message);
      fetchData();
      toggleDeleteSubCategoryModal();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="fullWrap">
      <div className="header_background">
        <Container>
          <div className="row row1">
            <div className="col-md-12 header_logo_1">
              <div className="header_logo">
                <a href="index.html">
                  <img src="images/top_logo1.png" alt=""></img>
                </a>
              </div>
              <div className="welcome_text">
                <h2>
                  Welcome to <span className="admin_text">Admin team bolt</span>
                </h2>
              </div>
              <div className="logout_btn">
                <Link to="/" onClick={() => localStorage.setItem('token', (''))}>
                  <i className="fas fa-sign-out-alt logout_btn_icon"></i>Logout
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="row row1">
          <div className="col-md-12">
            <div className="category_text">
              <h2>Categories</h2>
            </div>
            <div className="sub_category">
              <button
                className="add_button"
                onClick={() => {
                  setEditSubCategoryData({});
                  toggleAddSubCategoryModal();
                }}
              >
                <i className="fa fa-plus"></i>
              </button>
              <h2
                className="add_category_text"
                onClick={() => {
                  setEditSubCategoryData({});
                  toggleAddSubCategoryModal();
                }}
              >
                Add Sub Category
              </h2>
            </div>
            <div className="sub_category">
              <button
                className="add_button"
                onClick={() => {
                  setEditCategoryData({});
                  toggleAddCategoryModal();
                }}
              >
                <i className="fa fa-plus"></i>
              </button>
              <h2
                className="add_category_text"
                onClick={() => {
                  setEditCategoryData({});
                  toggleAddCategoryModal();
                }}
              >
                Add Category
              </h2>
            </div>
          </div>
        </div>
        <div className="row row1">
          <div className="col-md-12">
            {categoryData?.length ? (
              categoryData?.sort((a,b) => a?.catName?.localeCompare(b?.catName)).map((item) => {
                return (
                  <div className="fullCard">
                    <div className="CardHeader" onClick={() => 
                      toggle(item?._id)}>
                      <h4>{item?.catName}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditCategoryData(item);
                          toggleAddCategoryModal();
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <div className="headerArrow">
                        {isOpen === item?._id ? (
                          <i className="fas fa-caret-square-up"></i>
                        ) : (
                          <i className="fas fa-caret-square-down"></i>
                        )}
                      </div>
                    </div>
                    <Collapse isOpen={isOpen === item?._id}>
                      <div>
                        <table className="tableWrap">
                          <thead>
                            <tr>
                              <th scope="col" className="th_text" style={{textAlign:"left"}}>Image</th>
                              <th scope="col" className="th_text">
                                Sub Category
                              </th>
                              <th scope="col" className="th_text">
                                Density
                              </th>
                              <th scope="col" className="th_text">
                                Price
                              </th>
                              <th scope="col" className="th_text">
                                Weight
                              </th>
                              <th scope="col" className="th_text">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {item?.subCategoryData?.length
                              ? item?.subCategoryData?.map((i) => {
                                  return (
                                    <tr className="table_content">
                                      <td>
                                        <img
                                          src={i?.catImg ? `${BASE_URL}/images/${i?.catImg}` : 'images/Carbon_Fiber.png'}
                                          alt=""
                                        />
                                      </td>
                                      <td className="td_text">
                                        <span className="zylon_fiber_text">
                                          {i?.subCatName}
                                        </span>
                                      </td>
                                      <td className="td_text">
                                        <span className="zylon_fiber_text">
                                          {i?.density}{' '}
                                        </span>
                                        g/cm^3
                                      </td>
                                      <td className="td_text">
                                        <span className="zylon_fiber_text">
                                          {i?.price}
                                        </span>{" "}
                                        Rs/Kg
                                      </td>
                                      <td className="td_text">
                                        <span className="zylon_fiber_text">
                                          {i?.weight}{" "}
                                        </span>
                                        Kg
                                      </td>
                                      <td className="td_btn">
                                        <button
                                          type="edit"
                                          className="sub_edit_btn"
                                          onClick={() => {
                                            setEditSubCategoryData(i);
                                            toggleAddSubCategoryModal();
                                          }}
                                        >
                                          <i className="fas fa-pencil-alt"></i>
                                        </button>{" "}
                                        <button
                                          type="edit"
                                          className="sub_delete_btn"
                                          onClick={() => {
                                            setDeleteData(i)
                                            toggleDeleteSubCategoryModal();
                                            }}
                                          // onClick={() => deleteSubCategory(i)}
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              : null}
                          </tbody>
                        </table>
                      </div>
                    </Collapse>
                  </div>
                );
              })
            ) : (
              <p
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "600",
                  marginTop: 30,
                }}
              >
                No data found
              </p>
            )}
          </div>
        </div>
        {addCategoryModal ? (
          <AddCategoryModal
            modal={addCategoryModal}
            toggle={toggleAddCategoryModal}
            fetchData={fetchData}
            editData={editCategoryData}
          />
        ) : null}
        {addSubCategoryModal ? (
          <AddSubCategoryModal
            modal={addSubCategoryModal}
            toggle={toggleAddSubCategoryModal}
            category={categoryData}
            fetchData={fetchData}
            editData={editSubCategoryData}
          />
        ) : null}
        {deleteSubCategoryModal ? (
          <DeleteSubCategoryModal modal={deleteSubCategoryModal} toggle={toggleDeleteSubCategoryModal} deleteClick={deleteSubCategory} />
        ) : null}
        
      </Container>
    </div>
  );
};

export default Dashboard;
