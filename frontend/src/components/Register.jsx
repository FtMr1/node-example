import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kullanıcı verilerini oluşturma
    const user = { username, email, password };

    // Verilerin eksik olup olmadığını kontrol etme
    if (!username || !email || !password) {
      setMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // API isteği gönderme
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Kayıt işlemi başarılı!');
        navigate('/login')
      } else {
        setMessage(data.error || 'Kayıt işlemi başarısız oldu');
      }
    } catch (error) {
      setMessage('Sunucuya bağlanılamadı.');
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>E-posta:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Kayıt Ol</button>
      
      </form>
      {message && <p>{message}</p>}
      <p>Zaten kayıt olduysanız tıklayın <Link to="/userLogin">Giriş yap</Link> </p>
    </div>
  );
};

export default RegisterForm;
