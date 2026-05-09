import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecover = (e) => {
    e.preventDefault();

    if (email) {
      alert("Um link de recuperação foi enviado para seu email!");
      navigate("/login"); // 🔑 volta para login após envio
    } else {
      alert("Digite seu email para recuperar a senha!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Recuperar Senha</h1>
        <form onSubmit={handleRecover} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Enviar link</button>
        </form>
        <p className={styles.text}>
          Lembrou a senha? <span onClick={() => navigate("/login")} className={styles.link}>Entrar</span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;


