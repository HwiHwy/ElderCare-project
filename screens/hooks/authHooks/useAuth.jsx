import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  BOTTOM,
  LOGIN_MAIN,
  ONBOARDING_SCREEN,
} from "../../../constants/nameRoute";
import { Alert } from "react-native";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { base64 } from "base64-js";
import { decode, encode } from "base-64";
const loginURL =
  "https://elder-care-api.monoinfinity.net/api/Login/loginCustomer";
const registerURL = "https://elder-care-api.monoinfinity.net/api/SignIn/signinCustomer";
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const loginQuery = async ({ email, password, fcmToken }) => {
  try {
    const response = await axios.post(loginURL, { email, password, fcmToken });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("loi", error);
    if (error.response) {
      console.error(error.response.data);
    }
    throw error;
  }
};

const registerQuery = async (data) => {
  try {
    const response = await axios.post(registerURL, data);
    if (response.status === 200) {
      return "Tạo tài khoản thành công";
    } else {
      throw new Error("Có lỗi khi đăng kí");
    }
  } catch (error) {
    throw error;
  }
};
const fetchUserDataById = async (accountId, token) => {
  try {
    const apiUrl = `https://elder-care-api.monoinfinity.net/api/Accounts/${accountId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response);

    if (response.status === 200) {
      const userData = response.data;
      console.log("User Data:", userData);

      return userData;
    } else {
      console.error("API Error:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

function useAuth(accountId, token) {
  const navigation = useNavigation();
  useEffect(() => {
    console.log(
      "useEffect triggered with accountId:",
      accountId,
      "and token:",
      token
    );
    const fetchData = async () => {
      try {
        const userData = await fetchUserDataById(accountId, token);
        console.log("data:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (accountId !== undefined && token !== undefined) {
      fetchData();
    }
  }, [accountId, token]);

  const loginMutation = useMutation({
    mutationFn: loginQuery,
    onSuccess: async (data) => {
      try {
        const userToken = data?.data;

        if (userToken && typeof userToken === "string" && userToken.trim() !== "") {
          const decodedUserData = jwtDecode(userToken);

          console.log("Decoded User Data:", decodedUserData);

          await AsyncStorage.setItem("userData", JSON.stringify(decodedUserData));
          await AsyncStorage.setItem("tokenUser", userToken);

          navigation.push(BOTTOM);
        } else {
          Alert.alert("Lỗi đăng nhập", "Đã xảy ra lỗi khi đăng nhập");
        }
      } catch (error) {
        console.error("Error decoding or storing user data:", error);
        throw error;
      }
    },
    onError: () => {
      Alert.alert("Lỗi đăng nhập", "Sai email hoặc mật khẩu");
    },
  });
  const registerMutation = useMutation({
    mutationFn: registerQuery,
    onSuccess: (mesg) => {
      Alert.alert("Tạo tài khoản", mesg, [
        { text: "OK", onPress: () => navigation.push(LOGIN_MAIN) },
      ]);
    },
    onError: (error) => {
      Alert.alert("Lỗi đăng kí", "Có lỗi khi đăng kí");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isLoading,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isLoading,
  };
}

export default useAuth;
