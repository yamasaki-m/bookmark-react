import axios from "axios";

export const firebaseInstance = axios.create({
  baseURL:
    "https://bookmark-vue-9e70a-default-rtdb.asia-southeast1.firebasedatabase.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export class Firebase {
  static async auth(user: any) {
    const { authMode, email, password } = user;
    const response = await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${authMode}?key=AIzaSyD7Z6iAl0ly6mwd4IKih0DRfHSsw7It1Xs`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .catch((error) => {
        throw new Error(error.message || "認証に失敗しました。");
      });

    const responseData = response.data;

    return {
      userId: responseData.localId,
      token: responseData.idToken,
      expiresIn: responseData.expiresIn,
      refreshToken: responseData.refreshToken,
    };
  }

  static async refreshToken(currentRefreshToken: string) {
    const response: any = await axios
      .post(
        "https://securetoken.googleapis.com/v1/token?key=AIzaSyD7Z6iAl0ly6mwd4IKih0DRfHSsw7It1Xs",
        {
          grant_type: "refresh_token",
          refresh_token: currentRefreshToken,
        }
      )
      .catch((error) => {
        throw new Error(error.message || "トークンの更新に失敗しました。");
      });

    return response.data;
  }

  static async fetchCard({ userId, token }: any) {
    const response: any = await firebaseInstance
      .get(`guest/cards.json`)
      .catch((error) => {
        throw new Error(error);
      });

    return response.data;
  }

  static async deleteCard({ userId, token, newCards }: any) {
    await firebaseInstance
      .put(`users/${userId}/cards.json?auth=` + token, {
        ...newCards,
      })
      .catch((error) => {
        throw new Error(error.message || "データを送信できませんでした。");
      });
  }
}
