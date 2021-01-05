import axios from "axios";
/**
 * 获取轮播图
 */
export async function getBanner() {
  return new Promise((resolve, reject) => {
    axios
      .get("/cloud/banner")
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function getTest() {
  return new Promise((resolve, reject) => {
    axios
      .get("/cloud/banner")
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/** 获取响应 不带参数 */
export async function getResponse(url: string) {
  return new Promise((resolve, reject) => {
    axios
      .get("/cloud" + url)
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function getArgaResponse(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axios
      .get("/cloud" + url, {
        params: data,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/** 获取歌曲相关信息函数 */
export async function getMusicInfo(url: string, data?: any) {
  return await axios.get(url, data);
}
