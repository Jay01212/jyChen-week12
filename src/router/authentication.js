import { ref } from "vue";

const isAuthentication = ref(false);

export function useAuthentication() {
  const login = () => {
    isAuthentication.value = true;
  };

  const logout = () => {
    isAuthentication.value = false;
  };

  return { isAuthentication, login, logout };
}
