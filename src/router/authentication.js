import { ref } from "vue";

const isAuthentication = ref(false);

export function useAuthentication() {
  const login = () => {
    isAuthentication.value = true;
  };

  const logout = () => {
    isAuthentication.value = false;
    router.push({ name: 'Login' }); //back to the login page after logout
  };

  return { isAuthentication, login, logout };
}
