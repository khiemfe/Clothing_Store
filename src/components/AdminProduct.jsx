import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import TabelComponents from "./TabelComponents";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Space } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { convertPrice, getBase64, renderOptions } from "../utils";
import * as ProducttServcie from "../services/ProductServices";
import { useMutationHook } from "../hooks/useMutationHook";
import LoadingComponents from "../components/LoadingComponents";
import { success, error, warning } from "../components/Message";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import DrawerComponent from "./DrawerComponent";
import ModelBodyComponent from "./ModelBodyComponent";
import { useSelector } from "react-redux";
import ModelComponent from "./ModelComponent";
import { Select } from "antd";
import LoadingCardInfoComponent from "./LoadingCardInfoComponent";
import LoadingUpdateComponent from "./LoadingUpdateComponent";

const AdminProduct = () => {
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  // const [isModelOpen, setIsModalOpen] = useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user);
  const [isModelOpenDelete, setIsModelOpenDelete] = useState(false);
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    gender: "",
    price: "",
    age: "",
    size: "",
    type: "",
    quantity: {
      sizeS: "",
      sizeM: "",
      sizeL: "",
      sizeXL: "",
    },
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    gender: "",
    price: "",
    age: "",
    size: "",
    type: "",
    quantity: {
      sizeS: "",
      sizeM: "",
      sizeL: "",
      sizeXL: "",
    },
  });

  const mutation = useMutationHook((data) => {
    console.log("dateCreate", data);
    const {
      name,
      image,
      gender,
      price,
      age,
      size,
      type,
      quantity: { sizeS, sizeM, sizeL, sizeXL },
    } = data;

    const res = ProducttServcie.createProduct(data?.token, {
      name,
      image,
      gender,
      price,
      age,
      size,
      type,
      quantity: {
        sizeS,
        sizeM,
        sizeL,
        sizeXL,
      },
    });
    return res;
  });

  const { data, isLoading, isSuccess, isError } = mutation;

  const mutationUpdate = useMutationHook((data) => {
    console.log("dataUpdate: ", data);
    const { id, token, ...rest } = data;
    const res = ProducttServcie.updateProduct(id, token, { ...rest });
    console.log("resssss", res);
    return res;
  });

  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  console.log("mutationUpdate", mutationUpdate);

  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    const res = ProducttServcie.deleteProduct(id, token);
    return res;
  });

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  const mutationDeleteMany = useMutationHook((data) => {
    const { token, ...ids } = data;
    const res = ProducttServcie.deleteManyProduct(ids, token);
    return res;
  });

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;

  const handleDeleteManyProduct = (ids) => {
    console.log(ids); // ids là tất cả các id mà muốn xoá
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      success();
      onClose();
    } else if (isError) {
      error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      success();
      onCloseDrawer();
    } else if (isErrorUpdated) {
      error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      success();
      handleCanelDelete();
    } else if (isErrorDeleted) {
      error();
    }
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      success();
      // onClose()
    } else if (isErrorDeletedMany) {
      error();
    }
  }, [isSuccessDeletedMany]);

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAllType = async () => {
    const res = await ProducttServcie.getAllType();
    return res?.data;
  };
  const typeProduct = useQuery(["type-product"], fetchAllType);
  console.log("typeProduct", typeProduct?.data);

  const options = renderOptions(typeProduct?.data);
  console.log("options", options);

  const [typeSelect, setTypeSelect] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const handleChangeSelect = (e) => {
    console.log("options value", e);
    if (e?.value !== "add_type") {
      setStateProduct({
        ...stateProduct,
        type: e?.value,
      });
      setStateProductDetails({
        ...stateProductDetails,
        type: e?.value,
      });
    } else {
      setStateProduct({
        ...stateProduct,
        type: "",
      });
      setStateProductDetails({
        ...stateProductDetails,
        type: "",
      });
    }
    setTypeSelect(e?.value);
  };
  console.log("typeSelect", typeSelect);

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = () => {
    setTypeSelect("");
    if (
      stateProduct.name !== "" &&
      stateProduct.image !== "" &&
      stateProduct.gender !== "" &&
      stateProduct.price !== "" &&
      stateProduct.age !== "" &&
      stateProduct.size !== "" &&
      stateProduct.quantity !== "" &&
      stateProduct.type !== ""
    ) {
      console.log("Success:", stateProduct);
    } else {
      console.log("err stateProduct");
    }
    mutation.mutate(
      { token: user?.access_token, ...stateProduct },
      {
        //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const onClose = () => {
    // setIsModalOpen(false)
    setStateProduct({
      ...stateProductDetails,
      quantity: {
        sizeS: "",
        sizeM: "",
        sizeL: "",
        sizeXL: "",
      },
      image: "", //xóa image
    });
    form.resetFields(); //xóa các label
    // props.onHide() //đóng form
    setModalShow(false);
    setTypeSelect("");
  };

  // --------------

  const getAllProducts = async () => {
    const res = await ProducttServcie.getAllProduct();
    return res;
  };

  const queryProduct = useQuery(["products"], getAllProducts);
  const { data: dataProduct, isLoading: isLoadingProduct } = queryProduct;

  const fetchGetDetailsProduct = async (rowSelected) => {
    setIsLoadingUpdate(true);
    const res = await ProducttServcie.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        gender: res?.data?.gender,
        price: res?.data?.price,
        age: res?.data?.age,
        size: res?.data?.size,
        type: res?.data?.type,
        quantity: {
          sizeS: res?.data?.quantity?.sizeS,
          sizeM: res?.data?.quantity?.sizeM,
          sizeL: res?.data?.quantity?.sizeL,
          sizeXL: res?.data?.quantity?.sizeXL,
        },
      });
    }
    setIsLoadingUpdate(false);
    setTypeSelect(res?.data?.type);
    setPlaceholder(res?.data?.type);
    console.log("ressss", res.data.type);
  };

  console.log("stateProductDetails", stateProductDetails);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsProduct(rowSelected); //nếu có nó mới gọi, để khi click lần đầu là đc luôn
    }
  }, [rowSelected, isOpenDrawer]);

  // hiển thị value trong thẻ input khi bấm vào sửa
  console.log("formUpdate.__INTERNAL__.name", formUpdate.__INTERNAL__.name);
  useEffect(() => {
    // setIsLoadingUpdate(true)
    if (formUpdate.__INTERNAL__.name) {
      formUpdate.setFieldsValue(stateProductDetails);
    }
  }, [formUpdate, stateProductDetails]);

  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      // fetchGetDetailsProduct(rowSelected)
    }
    setIsOpenDrawer(true);
    console.log("rowSelected", rowSelected);
  };

  const onUpdateProduct = () => {
    //...stateProductDetails nó mới cập nhật lại thành công
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateProductDetails },
      {
        //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    setTypeSelect("");
    console.log("stateProductDetailss", stateProductDetails);
  };

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      gender: "",
      price: "",
      age: "",
      size: "",
      type: "",
      quantity: {
        sizeS: "",
        sizeM: "",
        sizeL: "",
        sizeXL: "",
      },
    });
    formUpdate.resetFields();
  };

  const handleCanelDelete = () => {
    setIsModelOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const renderAction = () => {
    return (
      <div>
        <AiOutlineEdit
          style={{ cursor: "pointer", fontSize: "24px" }}
          onClick={handleDetailsProduct}
        />
        <MdDeleteOutline
          style={{ cursor: "pointer", fontSize: "24px" }}
          onClick={() => {
            setIsModelOpenDelete(true);
            console.log("da ok");
          }}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0])
    // setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('')
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            <CloseOutlined />
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   width: 100,
    // },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        {
          text: "Nam",
          value: "Nam",
        },
        {
          text: "Nữ",
          value: "Nữ",
        },
      ],
      onFilter: (value, record) => record.gender.includes(value),
    },
    {
      title: "Price",
      dataIndex: "priceRender",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: "Dưới 200k",
          value: "<200",
        },
        {
          text: "Dưới 300k",
          value: "<300",
        },
        {
          text: "Dưới 400k",
          value: "<400",
        },
        {
          text: "Dưới 500k",
          value: "<500",
        },
        {
          text: "Dưới 600k",
          value: "<600",
        },
        {
          text: "Dưới 700k",
          value: "<700",
        },
        {
          text: "Dưới 800k",
          value: "<800",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<200") {
          return record.price < 200;
        } else if (value === "<300") {
          return record.price < 300;
        } else if (value === "<400") {
          return record.price < 400;
        } else if (value === "<500") {
          return record.price < 500;
        } else if (value === "<600") {
          return record.price < 600;
        } else if (value === "<700") {
          return record.price < 700;
        } else if (value === "<800") {
          return record.price < 800;
        }
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.ageTu - b.ageTu,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Size",
      dataIndex: "size",
      filters: [
        {
          text: "Ốm",
          value: "Ốm",
        },
        {
          text: "Bình thường",
          value: "Bình thường",
        },
        {
          text: "Mập",
          value: "Mập",
        },
      ],
      onFilter: (value, record) => record.size.includes(value),
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: [
        {
          text: "Áo ấm",
          value: "Áo ấm",
        },
        {
          text: "Quần Jean",
          value: "Quần Jean",
        },
        {
          text: "Áo thun",
          value: "Áo thun",
        },
        {
          text: "Đồ thể thao",
          value: "Đồ thể thao",
        },
      ],
      onFilter: (value, record) => record.type?.includes(value),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    dataProduct?.data?.length &&
    dataProduct?.data?.map((product) => {
      return {
        ...product,
        quantity: `S(${product?.quantity?.sizeS || 0}), M(${
          product?.quantity?.sizeM || 0
        }), L(${product?.quantity?.sizeL || 0}), XL(${
          product?.quantity?.sizeXL || 0
        })`,
        priceRender:  convertPrice(product?.price),
        ageTu: product?.age.split("-")[0],
        ageDen: product?.age.split("-")[1],
        key: product?._id,
      };
    });

  console.log("dataTable", dataTable);
  // }
  return (
    <>
      <h1
        style={{ textTransform: "uppercase", margin: "10px 0 20px 0" }}
        className="text_QLSP"
      >
        Quản lí sản phẩm
      </h1>
      <div className="adminProduct">
        <Button
          onClick={() => {
            setModalShow(true);
            setTypeSelect("");
          }}
          style={{
            backgroundColor: "#fff",
            width: "100px",
            height: "100px",
            fontSize: "40px",
            borderColor: "#000",
          }}
        >
          <GrAdd />
        </Button>
        <div className="body-product">
          <TabelComponents
            handleDeleteManyProduct={handleDeleteManyProduct}
            columns={columns}
            dataTable={dataTable}
            products={dataProduct?.data}
            isLoading={isLoadingProduct}
            filename="Products Table"
            sheet="Product"
            text="sản phẩm"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </div>
        <div className="createProduct">
          <Modal
            // forceRender
            show={modalShow}
            onHide={() => {
              // setModalShow(false)
              onClose();
            }}
            // {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Tạo sản phẩm
              </Modal.Title>
            </Modal.Header>

            <ModelBodyComponent
              stateProduct={stateProduct}
              form={form}
              handleOnchange={handleOnchange}
              handleChangeSelect={handleChangeSelect}
              options={options}
              typeSelect={typeSelect}
              handleOnchangeAvatar={handleOnchangeAvatar}
              onFinish={onFinish}
              isLoading={isLoading}
              title="Add"
            />
          </Modal>
        </div>
        <div>
          <DrawerComponent
            title="Chỉnh sửa sản phẩm"
            isOpen={isOpenDrawer}
            onClose={() => {
              setIsOpenDrawer(false);
              setTypeSelect("");
              setPlaceholder("");
            }}
          >
            {/* <Modal
            show={isOpenDrawer}
            onHide={() => {
              setIsOpenDrawer(false);
              setTypeSelect("");
              setPlaceholder("");
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          > */}
            {/* <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Chỉnh sửa sản phẩm
              </Modal.Title>
            </Modal.Header> */}
            <LoadingUpdateComponent isLoading={isLoadingUpdate}>
              {/* {!isLoadingUpdate && ( */}
              <ModelBodyComponent
                stateProduct={stateProductDetails}
                form={formUpdate}
                handleOnchange={handleOnchangeDetails}
                handleChangeSelect={handleChangeSelect}
                options={options}
                typeSelect={typeSelect}
                placeholder={placeholder}
                handleOnchangeAvatar={handleOnchangeAvatarDetails}
                onFinish={onUpdateProduct}
                isLoading={isLoadingUpdated}
                title="Update"
              />
              {/* )} */}
            </LoadingUpdateComponent>
            {/* </Modal> */}
          </DrawerComponent>
        </div>
        <div>
          <ModelComponent
            title="Xoá sản phẩm"
            isModalOpen={isModelOpenDelete}
            onCancel={handleCanelDelete}
            onOk={handleDeleteProduct}
          >
            <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
            <span
              style={{ position: "absolute", right: "35%", bottom: "15px" }}
            >
              <LoadingComponents isLoading={isLoadingDeleted} />
            </span>
          </ModelComponent>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
