import axios from "axios";
import { server } from "~/globals";
import { UserState } from "~/types";

class AuthService {
  static async login(user: UserState) {
    return await axios.post(`${server}/api/user/login`, user);
  }

  static async logout() {
    await axios.post(`${server}/api/user/logout`);
  }
}

export default AuthService;
