import {
  AddAddress,
  EditAddress
} from "../../../../services/address/fetchAddress"
let addressPromise = [];

/** 地址编辑Promise */
export const getAddressPromise = () => {
  let resolver;
  let rejecter;
  const nextPromise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  addressPromise.push({
    resolver,
    rejecter
  });
  return nextPromise;
};

/** 用户保存了一个地址 */
export const resolveAddress = (address) => {
  const allAddress = [...addressPromise];
  addressPromise = [];

  console.info('用户保存了一个地址', address);
  let params = {
    addressID: null || address.addressId,
    linkPhone: address.phone,
    linkMan: address.name,
    linkAddress: address.detailAddress,
    province: address.provinceName,
    provinceID: address.provinceCode,
    city: address.cityName,
    cityID: address.cityCode,
    areaID: address.districtCode,
    area: address.districtName,
    isDefault: address.isDefault
  }

  if (params.addressID) {
    EditAddress(params)

  } else {
    AddAddress(params);
  }


  // allAddress.forEach(({
  //   resolver
  // }) => resolver(address));
  console.log(allAddress);
};

/** 取消编辑 */
export const rejectAddress = () => {
  const allAddress = [...addressPromise];
  addressPromise = [];

  allAddress.forEach(({
    rejecter
  }) => rejecter(new Error('cancel')));
};