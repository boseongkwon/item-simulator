export default function (validated) {
  const data = {};

  for (const external in validated) {
    if (validated[external] !== null && typeof validated[external] === 'object') {
      for (const internal in validated[external]) {
        data[internal] = validated[external][internal];
      }
    }

    if (validated[external] !== undefined && typeof validated[external] !== 'object') {
      data[external] = validated[external];
    }
  }

  return data;
}
