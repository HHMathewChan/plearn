/// <reference types="vite/client" />
type LoginProps = {
  setToken: (token: string) => void;
};

// credentials type for login
type Credentials = {
  email: string;
  password: string;
};