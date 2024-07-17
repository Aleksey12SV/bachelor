import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isInitialized = useRef(false);
  const { initKeycloak, authenticated } = useKeycloak();

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    initKeycloak();
  }, [initKeycloak]);

  useEffect(() => {
    if(authenticated){
      navigate('/');
    }
  })


  return (
    <form className="h-full w-full items-center justify-center">
      <span>Username</span>
      <input
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      ></input>
      <span>Password</span>
      <input
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(username, password);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
