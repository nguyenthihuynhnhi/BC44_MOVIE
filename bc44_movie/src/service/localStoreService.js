export let localServ = {
  setUser: (user) => {
    // lưu
    let dataJson = JSON.stringify(user);
    localStorage.setItem("USER_LOGIN", dataJson);
  },
  getUser: () => {
    // lấy
    let dataJson = localStorage.getItem("USER_LOGIN");
    return JSON.parse(dataJson);
  },
  removeUser: () => {
    // xoá
    localStorage.removeItem("USER_LOGIN");
  },
};
