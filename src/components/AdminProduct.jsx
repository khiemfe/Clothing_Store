import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import TabelComponents from "./TabelComponents";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Space } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { getBase64 } from "../utils";
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
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    gender: "",
    price: "",
    age: "",
    size: "",
  });

  const mutation = useMutationHook((data) => {
    console.log('dateCreate', data);
    const { name, image, gender, price, age, size } = data;

    const res = ProducttServcie.createProduct(data?.token, {
      name,
      image,
      gender,
      price,
      age,
      size,
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

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = () => {
    if (
      stateProduct.name !== "" &&
      stateProduct.image !== "" &&
      stateProduct.gender !== "" &&
      stateProduct.price !== "" &&
      stateProduct.age !== "" &&
      stateProduct.size !== ""
    ) {
      console.log("Success:", stateProduct);
    } else {
      console.log("err stateProduct");
    }
    mutation.mutate({token: user?.access_token, ...stateProduct}, {
      //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const onClose = () => {
    // setIsModalOpen(false)
    setStateProduct({
      image: "", //xóa image
    });
    form.resetFields(); //xóa các label
    // props.onHide() //đóng form
    setModalShow(false);
  };

  // --------------

  const getAllProducts = async () => {
    const res = await ProducttServcie.getAllProduct();
    return res;
  };

  const queryProduct = useQuery(["products"], getAllProducts);
  const { data: dataProduct, isLoading: isLoadingProduct } = queryProduct;

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProducttServcie.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        gender: res?.data?.gender,
        price: res?.data?.price,
        age: res?.data?.age,
        size: res?.data?.size,
      });
    }
    setIsLoadingUpdate(false);
    console.log("ressss", res);
  };

  console.log("stateProductDetails", stateProductDetails);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsProduct(rowSelected); //nếu có nó mới gọi, để khi click lần đầu là đc luôn
    }
  }, [rowSelected, isOpenDrawer]);

  // hiển thị value trong thẻ input khi bấm vào sửa
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
        priceRender: product?.price + ".000đ",
        ageTu: product?.age.split("-")[0],
        ageDen: product?.age.split("-")[1],
        key: product?._id,
      };
    });
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
          onClick={() => setModalShow(true)}
          style={{
            backgroundColor: "#fff",
            width: "100px",
            height: "100px",
            fontSize: "40px",
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
              handleOnchangeAvatar={handleOnchangeAvatar}
              onFinish={onFinish}
              isLoading={isLoading}
              title="Add"
            />

            {/* <Modal.Footer>
                        <Button onClick={onClose} aria-label="Close">Close</Button>
                      </Modal.Footer> */}
          </Modal>
        </div>
        <div>
          <DrawerComponent
            title="Chi tiết sản phẩm"
            isOpen={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
          >
            <LoadingComponents isLoading={isLoadingUpdate}>
              <ModelBodyComponent
                stateProduct={stateProductDetails}
                form={formUpdate}
                handleOnchange={handleOnchangeDetails}
                handleOnchangeAvatar={handleOnchangeAvatarDetails}
                onFinish={onUpdateProduct}
                isLoading={isLoadingUpdated}
                title="Update"
              />
            </LoadingComponents>
          </DrawerComponent>
        </div>
        <div>
          <ModelComponent
            title="Xoá sản phẩm"
            isModalOpen={isModelOpenDelete}
            onCancel={handleCanelDelete}
            onOk={handleDeleteProduct}
          >
            <LoadingComponents isLoading={isLoadingDeleted}>
              <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
            </LoadingComponents>
          </ModelComponent>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
