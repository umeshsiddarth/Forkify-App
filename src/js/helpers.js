import "regenerator-runtime/runtime";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchDetails = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchDetails, timeout(TIMEOUT_SEC)]);
    const { data, message } = await res.json();
    if (!res.ok) throw new Error(`${message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// The above method AJAX works for both get and post json

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const { data, message } = await res.json();
//     if (!res.ok) throw new Error(`${message} ${res.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchDetails = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchDetails, timeout(TIMEOUT_SEC)]);
//     const { data, message } = await res.json();
//     if (!res.ok) throw new Error(`${message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
