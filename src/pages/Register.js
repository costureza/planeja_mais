import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (nome && email && senha) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const existe = usuarios.find((u) => u.email === email);
      if (existe) {
        alert("Esse email já está cadastrado!");
        return;
      }

      const novoUsuario = { nome, email, senha, avatar };
      usuarios.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Criar Conta</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className={styles.input} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className={styles.input} />
          <input type="text" placeholder="URL do avatar (opcional)" value={avatar} onChange={(e) => setAvatar(e.target.value)} className={styles.input} />
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        <p className={styles.text}>
          Já tem conta? <span onClick={() => navigate("/login")} className={styles.link}>Entrar</span>
        </p>
      </div>
    </div>
  );
}

export default Register;







