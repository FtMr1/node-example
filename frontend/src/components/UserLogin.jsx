import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";




function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
     
      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // local e kayot 
        localStorage.setItem('token', token);
        // Token'ı decode et
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // Role göre yönlendirme
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/login"); // veya diğer kullanıcı sayfası
        }
      }
    
    } catch (err) {
      setError("Giriş başarısız.");
    }
  };

  return (
    <div className="from">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
