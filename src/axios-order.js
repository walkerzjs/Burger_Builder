import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-2ef30.firebaseio.com/"
});

export default instance;
