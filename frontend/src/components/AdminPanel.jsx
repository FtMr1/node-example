import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Doğru import şekli

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Token'ı localStorage'dan al
      const token = localStorage.getItem('token' );
      console.log(token)

      if (token) {
        // Token'ı decode et
        const decodedToken = jwtDecode(token);
        setUserInfo({
          id: decodedToken.id,
          username: decodedToken.username,
          role: decodedToken.role,
          avatar: decodedToken.avatar,
        });
      } else {
        setError("Token bulunamadı");
      }
    } catch (err) {
      setError("Token decode edilemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>Hata: {error}</p>;
  }

  return (
    <div>
      {userInfo ? (
        <div>
          <h1>Hoşgeldiniz, {userInfo.username}</h1>
          <img src={userInfo.avatar} alt="Avatar" />
          <p>Rol: {userInfo.role}</p>
          {/* Diğer kullanıcı bilgileri */}
        </div>
      ) : (
        <p>Kullanıcı bilgileri bulunamadı.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
