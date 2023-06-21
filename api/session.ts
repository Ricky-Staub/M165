import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import authService from "src/services/auth.service";
import { LoginType, UserType } from "src/types/user.type";

const useSession = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  const login = (credentials: LoginType) => {
    authService.login(credentials).then((response) => {
      setUser(response);
      router.push("/");
    });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    const presentAccessToken = localStorage.getItem("access_token");
    if (presentAccessToken) {
      try {
        const { exp }: { exp: number } = jwtDecode(presentAccessToken);

        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(exp);

        const now = new Date();

        if (now >= expirationDate) {
          logout();
        }
      } catch (error) {
        logout();
      }
    } else {
      setUser(null);
    }
  }, []);

  return {
    user,
    login,
    logout,
  };
};

export default useSession;
