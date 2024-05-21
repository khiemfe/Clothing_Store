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
import { success, error } from "../components/Message";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import DrawerComponent from "./DrawerComponent";
import ModelBodyComponent from "./ModelBodyComponent";
import { useSelector } from "react-redux";
import ModelComponent from "./ModelComponent";
import LoadingUpdateComponent from "./LoadingUpdateComponent";
import * as CartServices from "../services/CartServices";
import { Toaster } from "react-hot-toast";
import LoadingFullComponents from "./LoadingFullComponents";

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
  const [checkUpload, setCheckUpload] = useState(0);
  const [checkUploadUpdate, setCheckUploadUpdate] = useState(false);
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    imageDetails: {
      image1: "",
      image2: "",
      image3: "",
    },
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
      sizeXXL: "",
      size28: "",
      size29: "",
      size30: "",
      size31: "",
      size32: "",
      size33: "",
      size34: "",
      size35: "",
      size36: "",
    },
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    imageDetails: {
      image1: "",
      image2: "",
      image3: "",
    },
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
      sizeXXL: "",
      size28: "",
      size29: "",
      size30: "",
      size31: "",
      size32: "",
      size33: "",
      size34: "",
      size35: "",
      size36: "",
    },
  });

  const mutation = useMutationHook((data) => {
    const {
      name,
      image,
      imageDetails: { image1, image2, image3 },
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
        sizeXXL,
        size28,
        size29,
        size30,
        size31,
        size32,
        size33,
        size34,
        size35,
        size36,
      },
    } = data;

    let res;
    if (
      name.toLowerCase().includes("quần") &&
      !name.toLowerCase().includes("áo")
    ) {
      res = ProducttServcie.createProduct(data?.token, {
        name,
        image,
        imageDetails: {
          image1,
          image2,
          image3,
        },
        gender,
        price,
        age,
        size,
        type,
        quantity: {
          size28,
          size29,
          size30,
          size31,
          size32,
          size33,
          size34,
          size35,
          size36,
        },
      });
    } else {
      res = ProducttServcie.createProduct(data?.token, {
        name,
        image,
        imageDetails: {
          image1,
          image2,
          image3,
        },
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
          sizeXXL,
        },
      });
    }
    return res;
  });

  const { data, isLoading, isSuccess, isError } = mutation;

  const mutationUploadImage = useMutationHook(async (images) => {
    const res = await ProducttServcie.uploadImage(images);
    return res;
  });

  const {
    data: dataUpload,
    isLoading: isLoadingUpload,
    isSuccess: isSuccessUpload,
    isError: isErrorUpload,
  } = mutationUploadImage;

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rest } = data;
    const res = ProducttServcie.updateProduct(id, token, { ...rest });
    return res;
  });

  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const mutationUpdateCart = useMutationHook((data) => {
    const { id, token, ...rest } = data;
    const res = CartServices.updateCart(id, token, rest);
    return res;
  });

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
    mutationDeleteUpdateCart.mutate({ ids: ids, token: user?.access_token });
  };

  const mutationDeleteUpdateCart = useMutationHook((data) => {
    const { token, ...ids } = data;
    const res = CartServices.deleteUpdateCart(ids, token);
    return res;
  });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      success("Bạn đã thêm sản phẩm thành công");
      onClose();
    } else if (isError) {
      error("Bạn đã thêm sản phẩm thất bại");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      success("Bạn đã cập nhật sản phẩm thành công");
      onCloseDrawer();
      const data = {
        id: rowSelected,
        token: user?.access_token,
        name: stateProductDetails?.name,
        price: stateProductDetails?.price,
        image: stateProductDetails?.image,
      };
      mutationUpdateCart.mutate(data);
    } else if (isErrorUpdated) {
      error("Bạn đã cập nhật sản phẩm thất bại");
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      success("Bạn đã xoá sản phẩm thành công");
    } else if (isErrorDeleted) {
      error("Bạn đã xoá sản phẩm thất bại");
    }
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      success("Bạn đã xoá các sản phẩm thành công");
      // onClose()
    } else if (isErrorDeletedMany) {
      error("Bạn đã xoá các sản phẩm thất bại");
    }
  }, [isSuccessDeletedMany]);

  // const uploadImage = async (event) => {
  //   const files = event.target.files;
  //   const base64s = [];
  //   for (var i = 0; i < files.length; i++) {
  //     var base = await convertBase64(files[i]);
  //     base64s.push(base);
  //   }
  //   mutationUploadImage.mutate(base64s);
  // };

  const handleOnchangeAvatarImg1 = async ({ fileList }) => {
    setCheckUploadUpdate(false);
    setCheckUpload(1);
    const base64s = [];
    for (var i = 0; i < fileList?.length; i++) {
      let base = await getBase64(fileList[i].originFileObj);
      base64s.push(base);
    }
    mutationUploadImage.mutate(base64s);
    setStateProduct({
      ...stateProduct,
      image: base64s[0],
      imageDetails: {
        image1: base64s[1] || stateProduct?.imageDetails?.image1 || "",
        image2: base64s[2] || stateProduct?.imageDetails?.image2 || "",
        image3: base64s[3] || stateProduct?.imageDetails?.image3 || "",
      },
    });
  };

  const handleOnchangeAvatarImg2 = async ({ fileList }) => {
    setCheckUploadUpdate(false);
    setCheckUpload(2);
    const base64s = [];
    for (var i = 0; i < fileList?.length; i++) {
      let base = await getBase64(fileList[i].originFileObj);
      base64s.push(base);
    }
    mutationUploadImage.mutate(base64s);
    setStateProduct({
      ...stateProduct,
      imageDetails: {
        image1: base64s[0] || stateProduct?.imageDetails?.image1 || "",
        image2: base64s[1] || stateProduct?.imageDetails?.image2 || "",
        image3: base64s[2] || stateProduct?.imageDetails?.image3 || "",
      },
    });
  };

  const handleOnchangeAvatarImg3 = async ({ fileList }) => {
    setCheckUploadUpdate(false);
    setCheckUpload(3);
    const base64s = [];
    for (var i = 0; i < fileList?.length; i++) {
      let base = await getBase64(fileList[i].originFileObj);
      base64s.push(base);
    }
    mutationUploadImage.mutate(base64s);
    setStateProduct({
      ...stateProduct,
      imageDetails: {
        image1: stateProduct?.imageDetails?.image1 || "",
        image2: base64s[0] || stateProduct?.imageDetails?.image2 || "",
        image3: base64s[1] || stateProduct?.imageDetails?.image3 || "",
      },
    });
  };

  const handleOnchangeAvatarImg4 = async ({ fileList }) => {
    setCheckUploadUpdate(false);
    setCheckUpload(4);
    const base64s = [];
    for (var i = 0; i < fileList?.length; i++) {
      let base = await getBase64(fileList[i].originFileObj);
      base64s.push(base);
    }
    mutationUploadImage.mutate(base64s);
    setStateProduct({
      ...stateProduct,
      imageDetails: {
        image1: stateProduct?.imageDetails?.image1 || "",
        image2: stateProduct?.imageDetails?.image2 || "",
        image3: base64s[0] || stateProduct?.imageDetails?.image3 || "",
      },
    });
  };

  useEffect(() => {
    if (
      dataUpload?.data[dataUpload?.data?.length - 1]?.url &&
      !checkUploadUpdate
    ) {
      setStateProduct({
        ...stateProduct,
        image:
          checkUpload === 1 ? dataUpload?.data[0]?.url : stateProduct?.image,
        imageDetails: {
          image1:
            dataUpload?.data?.[
              checkUpload === 1 ? 1 : checkUpload === 2 ? 0 : 5
            ]?.url ||
            stateProduct?.imageDetails?.image1 ||
            "",
          image2:
            dataUpload?.data?.[
              checkUpload === 1
                ? 2
                : checkUpload === 2
                ? 1
                : checkUpload === 3
                ? 0
                : 5
            ]?.url ||
            stateProduct?.imageDetails?.image2 ||
            "",
          image3:
            dataUpload?.data?.[
              checkUpload === 1
                ? 3
                : checkUpload === 2
                ? 2
                : checkUpload === 3
                ? 1
                : checkUpload === 4
                ? 0
                : 5
            ]?.url ||
            stateProduct?.imageDetails?.image3 ||
            "",
        },
      });
    }
  }, [dataUpload]);

  // const handleOnchangeAvatarDetails = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setStateProductDetails({
  //     ...stateProductDetails,
  //     image: file.preview,
  //     imageDetails: {
  //       image1: file.preview,
  //       image2: file.preview,
  //       image3: file.preview,
  //     },
  //   });
  // };

  const handleOnchangeAvatarDetailsImg1 = async ({ fileList }) => {
    setCheckUploadUpdate(true);
    setCheckUpload(1);
    const base64s = [];
    let base = await getBase64(fileList[0].originFileObj);
    base64s.push(base);
    mutationUploadImage.mutate(base64s);
    setStateProductDetails({
      ...stateProductDetails,
      image: base,
    });
  };

  const handleOnchangeAvatarDetailsImg2 = async ({ fileList }) => {
    setCheckUploadUpdate(true);
    setCheckUpload(2);
    const base64s = [];
    let base = await getBase64(fileList[0].originFileObj);
    base64s.push(base);
    mutationUploadImage.mutate(base64s);
    setStateProductDetails({
      ...stateProductDetails,
      imageDetails: {
        image1: base,
        image2: stateProductDetails?.imageDetails?.image2,
        image3: stateProductDetails?.imageDetails?.image3,
      },
    });
  };

  const handleOnchangeAvatarDetailsImg3 = async ({ fileList }) => {
    setCheckUploadUpdate(true);
    setCheckUpload(3);
    const base64s = [];
    let base = await getBase64(fileList[0].originFileObj);
    base64s.push(base);
    mutationUploadImage.mutate(base64s);
    setStateProductDetails({
      ...stateProductDetails,
      imageDetails: {
        image1: stateProductDetails?.imageDetails?.image1,
        image2: base,
        image3: stateProductDetails?.imageDetails?.image3,
      },
    });
  };

  const handleOnchangeAvatarDetailsImg4 = async ({ fileList }) => {
    setCheckUploadUpdate(true);
    setCheckUpload(4);
    const base64s = [];
    let base = await getBase64(fileList[0].originFileObj);
    base64s.push(base);
    mutationUploadImage.mutate(base64s);
    setStateProductDetails({
      ...stateProductDetails,
      imageDetails: {
        image1: stateProductDetails?.imageDetails?.image1,
        image2: stateProductDetails?.imageDetails?.image2,
        image3: base,
      },
    });
  };

  useEffect(() => {
    if (dataUpload?.data[0]?.url && checkUploadUpdate) {
      setStateProductDetails({
        ...stateProductDetails,
        image:
          checkUpload === 1
            ? dataUpload?.data[0]?.url
            : stateProductDetails?.image,
        imageDetails: {
          image1:
            checkUpload === 2
              ? dataUpload?.data[0]?.url
              : stateProductDetails?.imageDetails?.image1,
          image2:
            checkUpload === 3
              ? dataUpload?.data[0]?.url
              : stateProductDetails?.imageDetails?.image2,
          image3:
            checkUpload === 4
              ? dataUpload?.data[0]?.url
              : stateProductDetails?.imageDetails?.image3,
        },
      });
    }
  }, [dataUpload]);
  console.log(stateProductDetails);

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
  const options = renderOptions(typeProduct?.data);

  const newOptions = options.filter((item) => item !== undefined);

  const [typeSelect, setTypeSelect] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const handleChangeSelect = (e) => {
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
      // stateProduct.imageDetails !== "" &&
      stateProduct.gender !== "" &&
      stateProduct.price !== "" &&
      stateProduct.age !== "" &&
      stateProduct.size !== "" &&
      // stateProduct.quantity !== "" &&
      stateProduct.type
    ) {
      mutation.mutate(
        { token: user?.access_token, ...stateProduct },
        {
          //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
          onSettled: () => {
            queryProduct.refetch();
          },
        }
      );
    } else {
      console.log("err stateProduct");
    }
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
        sizeXXL: "",
        size28: "",
        size29: "",
        size30: "",
        size31: "",
        size32: "",
        size33: "",
        size34: "",
        size35: "",
        size36: "",
      },
      image: "", //xóa image
      imageDetails: {
        image1: "",
        image2: "",
        image3: "",
      },
      type: "",
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
        imageDetails: {
          image1: res?.data?.imageDetails?.image1,
          image2: res?.data?.imageDetails?.image2,
          image3: res?.data?.imageDetails?.image3,
        },
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
          sizeXXL: res?.data?.quantity?.sizeXXL,
          size28: res?.data?.quantity?.size28,
          size29: res?.data?.quantity?.size29,
          size30: res?.data?.quantity?.size30,
          size31: res?.data?.quantity?.size31,
          size32: res?.data?.quantity?.size32,
          size33: res?.data?.quantity?.size33,
          size34: res?.data?.quantity?.size34,
          size35: res?.data?.quantity?.size35,
          size36: res?.data?.quantity?.size36,
        },
      });
    }
    setIsLoadingUpdate(false);
    setTypeSelect(res?.data?.type);
    setPlaceholder(res?.data?.type);
  };

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
  };

  const onUpdateProduct = () => {
    //...stateProductDetails nó mới cập nhật lại thành công
    console.log("stateProductDetails", stateProductDetails);
    if (
      stateProductDetails.name !== "" &&
      stateProductDetails.image !== "" &&
      // stateProductDetails.imageDetails !== "" &&
      stateProductDetails.gender !== "" &&
      stateProductDetails.price !== "" &&
      stateProductDetails.age !== "" &&
      stateProductDetails.size !== "" &&
      // stateProductDetails.quantity !== "" &&
      stateProductDetails.type
    ) {
      mutationUpdate.mutate(
        { id: rowSelected, token: user?.access_token, ...stateProductDetails },
        {
          //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
          onSettled: () => {
            queryProduct.refetch();
          },
        }
      );
    }
    setTypeSelect("");
  };

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      imageDetails: {
        image1: "",
        image2: "",
        image3: "",
      },
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
        sizeXXL: "",
        size28: "",
        size29: "",
        size30: "",
        size31: "",
        size32: "",
        size33: "",
        size34: "",
        size35: "",
        size36: "",
      },
    });
    formUpdate.resetFields();
  };

  const handleCanelDelete = () => {
    setIsModelOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    handleCanelDelete();
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        //onSettled & queryProduct.refetch() nó mới cập nhật lại không cần load lại trang
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    const ids = [];
    ids.push(rowSelected);
    mutationDeleteUpdateCart.mutate({ ids: ids, token: user?.access_token });
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
      width: 250,
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
      width: 250,
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
        {
          text: "Khác",
          value: "Khác",
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
        }), XXL(${product?.quantity?.sizeXXL || 0})`,
        priceRender: convertPrice(product?.price),
        ageTu: product?.age.split("-")[0],
        ageDen: product?.age.split("-")[1],
        key: product?._id,
      };
    });

  const dataTableQuan =
    dataProduct?.data?.length &&
    dataProduct?.data?.map((product) => {
      return {
        ...product,
        quantity: `28(${product?.quantity?.size28 || 0}), 29(${
          product?.quantity?.size29 || 0
        }), 30(${product?.quantity?.size30 || 0}), 31(${
          product?.quantity?.size31 || 0
        }), 32(${product?.quantity?.size32 || 0}), 33(${
          product?.quantity?.size33 || 0
        }), 34(${product?.quantity?.size34 || 0}), 35(${
          product?.quantity?.size35 || 0
        }), 36(${product?.quantity?.size36 || 0})`,
        priceRender: convertPrice(product?.price),
        ageTu: product?.age.split("-")[0],
        ageDen: product?.age.split("-")[1],
        key: product?._id,
      };
    });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleDeleteProduct();
    }
  };
  // }

  return (
    <>
      <LoadingFullComponents
        isLoading={isLoading || isLoadingDeleted || isLoadingUpdated}
      />
      <Toaster />
      <h1
        style={{ textTransform: "uppercase", margin: "10px 0 20px 0" }}
        className="text_QLSP"
      >
        Quản lý sản phẩm
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
            dataTableQuan={dataTableQuan}
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
            className="systemModel"
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
              options={newOptions}
              typeSelect={typeSelect}
              handleOnchangeAvatarImg1={handleOnchangeAvatarImg1}
              handleOnchangeAvatarImg2={handleOnchangeAvatarImg2}
              handleOnchangeAvatarImg3={handleOnchangeAvatarImg3}
              handleOnchangeAvatarImg4={handleOnchangeAvatarImg4}
              onFinish={onFinish}
              isLoading={isLoadingUpload}
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
                options={newOptions}
                typeSelect={typeSelect}
                placeholder={placeholder}
                handleOnchangeAvatarImg1={handleOnchangeAvatarDetailsImg1}
                handleOnchangeAvatarImg2={handleOnchangeAvatarDetailsImg2}
                handleOnchangeAvatarImg3={handleOnchangeAvatarDetailsImg3}
                handleOnchangeAvatarImg4={handleOnchangeAvatarDetailsImg4}
                onFinish={onUpdateProduct}
                // isLoading={isLoadingUpdated}
                title="Update"
                isLoading={isLoadingUpload}
              />
              {/* )} */}
            </LoadingUpdateComponent>
            {/* </Modal> */}
          </DrawerComponent>
        </div>
        <div onKeyDown={handleKeyDown}>
          <ModelComponent
            title="Xoá sản phẩm"
            isModalOpen={isModelOpenDelete}
            onCancel={handleCanelDelete}
            onOk={handleDeleteProduct}
          >
            <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
          </ModelComponent>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
