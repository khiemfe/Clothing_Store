export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const renderOptions = (arr) => {
  let results = [];
  if (arr) {
    results = arr?.map((item) => {
      if (item !== "Khác") {
        return {
          value: item,
          label: item,
        };
      }
    });
  }
  results.push({
    value: "Khác",
    label: "Khác",
  });
  results.push({
    value: "add_type",
    label: "Thêm type",
  });
  return results;
};

export const renderOptionsAddress = (arr) => {
  let results = [];
  if (arr) {
    results = arr?.map((item) => {
      return {
        value: item?.name,
        // label: item?.codename,
      };
    });
  }
  return results;
};

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString();
    return `${result}.000 đ`;
  } catch {
    return null;
  }
};

export const convertDataChart = (data, type) => {
  try {
    const object = [];
    Array.isArray(data) &&
      data.forEach((option) => {
        option?.orderItems?.forEach((item) => {
          console.log("itemm", item[type]);
          object[item[type]] = item?.amount;
        });
      });
    console.log("objectt", object);
    const results =
      Array.isArray(Object.keys(object)) && //Object.keys(object): chuyển thành array keys
      Object.keys(object)?.map((item) => {
        return {
          name: item,
          value: object[item],
        };
      });
    console.log("results", results);
    return results;
  } catch (e) {
    return [];
  }
};
