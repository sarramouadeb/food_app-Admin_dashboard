import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/Firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe invalide');
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Nouvelle bannière header */}
      <header className="app-header">
        <div className="app-brand">
          <img src={logo} alt="MealBridge Logo" className="logo" />
          <span className="app-name">MealBridge</span>
        </div>
      </header>

      {/* Conteneur du formulaire */}
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Connexion Admin</h2>
            <p>Accès au tableau de bord</p>
          </div>
          
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Chargement...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;