// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// const fpPromise = FingerprintJS.load();

export const isNumber = (val) => typeof val === "number" && !Number.isNaN(val);

// export const getFp = async () => {
//   const fp = await fpPromise;
//   const result = await fp.get();
//   return result.visitorId;
// };
