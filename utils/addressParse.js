import {
  areaData
} from '../config/index';

const addressParse = (provinceName, cityName, countyName) => {
  return new Promise((resolve, reject) => {
    try {
      const province = areaData.find((v) => v.name === provinceName);
      console.log("province", province);
      // const {
      //   provinceCode: code
      // } = province;
      const provinceCode = province.code
      console.log("??", provinceCode);
      const city = province.children.find((v) => v.name === cityName);
      // const {
      //   code: cityCode
      // } = city;
      console.log(city);
      const cityCode = city.code
      const country = city.children.find((v) => v.name === countyName);
      console.log(country);
      // const {
      //   code: districtCode
      // } = country;
      const districtCode = country.code
      console.log(provinceCode,
        cityCode,
        districtCode, );
      resolve({
        provinceCode,
        cityCode,
        districtCode,
      });
    } catch (error) {
      reject('地址解析失败');
    }
  });
};

module.exports = {
  addressParse,
};