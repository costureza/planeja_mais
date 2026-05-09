import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      navigate("/resumo");
    } else {
      alert("Email ou senha inválidos!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Entrar</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>

        {/* Links extras */}
        <p className={styles.text}>
          Não tem conta?{" "}
          <span onClick={() => navigate("/register")} className={styles.link}>
            Cadastrar
          </span>
        </p>
        <p className={styles.text}>
          <span onClick={() => navigate("/forgot-password")} className={styles.link}>
            Esqueceu a senha?
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;








