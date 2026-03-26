import service from './request';
import Qs from 'qs';
import { webEnv } from '@/tool/tool';
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function $fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
        paramsSerializer: {
          serialize: function (params) {
            return Qs.stringify(params, {
              arrayFormat: 'repeat'
            });
          }
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function $post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 自定义上传加载进度条
 * @param url
 * @param data
 * @param callback
 * @returns {Promise}
 */
export function $post_file (url, data = {}, callback) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function (progressEvent) {
        callback(progressEvent)
      }
    }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function $post_form(url, data = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, data, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function $patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.patch(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function $put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export function $delete(url, data = {}) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        data: data
      })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

export function $preview(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob'
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function $download(url, params, fileName) {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob',
      timeout: 180 * 1000
    })
      .then((res) => {
        downloadFile(res.data || res, fileName);
        resolve(res);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function $download_post(url, params, fileName) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: params,
      responseType: 'blob',
      timeout: 180 * 1000
    })
      .then((res) => {
        // console.log(res,'《《《后台导出接口返回的信息,前台入参》》',params);
        const blob = new Blob([res], {
          type: 'application/vnd.ms-excel;charset=utf-8'
        });
        //   downloadFile(res.data, fileName)
        downloadFile(webEnv() === 'qiankun' ? res.data : blob, fileName);
        resolve(res);
      })
      .catch((err) => {
        console.log(err.response);
        reject(err.data);
      });
  });
}

// 返回响应内容
export function $downloadResponse(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob',
      onDownloadProgress: (progress) => {}
    })
      .then((res) => {
        resolve(res);
        // downloadFile(res.data || res, fileName)
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

function downloadFile(blob, fileName) {
  console.log(blob, fileName);
  if (!blob) {
    return;
  }
  const url = window.URL.createObjectURL(new Blob([blob]));
  console.log(new Blob([blob]));

  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
