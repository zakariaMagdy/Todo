export default class LocalStorage {
  setData(arr1, arr2, arr3) {
    window.localStorage.setItem("todos", JSON.stringify([arr1, arr2, arr3]));
  }

  getData() {
    const Data = window.localStorage.getItem("todos");
    return JSON.parse(Data);
  }

  checkData() {
    const isData = window.localStorage.getItem("todos");

    if (isData) {
      return true;
    }
  }
}
