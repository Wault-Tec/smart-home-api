export default function (data) {
    if (data) {
      if (typeof data === "string") {
        return data.trim().length === 0;
      } else {
        return true;
      }
    }
  
    return true;
}
  