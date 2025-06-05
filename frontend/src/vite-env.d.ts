/// <reference types="vite/client" />
type LoginProps = {
  setToken: (token: string) => void;
};

// credentials type for login
type Credentials = {
  username: string;
  password: string;
};