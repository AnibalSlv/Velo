import { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #FAF7F2;
    --ink: #1A1714;
    --muted: #7A7068;
    --accent: #C4783A;
    --accent-light: #E8C9A8;
    --border: #E2DDD7;
    --error: #C0392B;
    --success: #2D7D5A;
    --card-shadow: 0 2px 40px rgba(26,23,20,0.10), 0 1px 8px rgba(26,23,20,0.06);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(ellipse 60% 50% at 20% 80%, rgba(196,120,58,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 80% 20%, rgba(196,120,58,0.05) 0%, transparent 70%),
      var(--cream);
    padding: 24px;
  }

  .card {
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow: var(--card-shadow);
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    position: relative;
  }

  .card-top {
    background: var(--ink);
    padding: 36px 40px 28px;
    position: relative;
    overflow: hidden;
  }

  .card-top::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }

  .brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 14px;
  }

  .title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #FFFFFF;
    letter-spacing: -0.01em;
    line-height: 1.1;
  }

  .subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    margin-top: 6px;
    font-weight: 300;
  }

  .tab-bar {
    display: flex;
    border-bottom: 1px solid var(--border);
    background: #FDFCFA;
  }

  .tab {
    flex: 1;
    padding: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }

  .tab.active {
    color: var(--ink);
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 20%; right: 20%;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
  }

  .tab:hover:not(.active) {
    color: var(--ink);
    background: rgba(196,120,58,0.03);
  }

  .form-area {
    padding: 32px 40px 36px;
  }

  .field {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 7px;
  }

  .input-wrap {
    position: relative;
  }

  input {
    width: 100%;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    background: #FDFCFA;
    border: 1px solid var(--border);
    border-radius: 3px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    appearance: none;
  }

  input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(196,120,58,0.10);
  }

  input.error {
    border-color: var(--error);
    box-shadow: 0 0 0 3px rgba(192,57,43,0.08);
  }

  .error-msg {
    font-size: 11.5px;
    color: var(--error);
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 0.05em;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.15s;
    padding: 2px;
  }

  .password-toggle:hover { color: var(--ink); }

  input[type="password"] + .password-toggle,
  input[type="text"] + .password-toggle {
    right: 12px;
  }

  .submit-btn {
    width: 100%;
    padding: 13px;
    margin-top: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FFFFFF;
    background: var(--ink);
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    position: relative;
    overflow: hidden;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(196,120,58,0.15));
    opacity: 0;
    transition: opacity 0.2s;
  }

  .submit-btn:hover { background: #2D2925; }
  .submit-btn:hover::after { opacity: 1; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .submit-btn.loading {
    color: transparent;
  }

  .spinner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner::after {
    content: '';
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .toast {
    margin: 0 40px 24px;
    padding: 12px 16px;
    border-radius: 3px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideIn 0.3s ease;
  }

  .toast.success {
    background: rgba(45,125,90,0.08);
    color: var(--success);
    border: 1px solid rgba(45,125,90,0.2);
  }

  .toast.error {
    background: rgba(192,57,43,0.07);
    color: var(--error);
    border: 1px solid rgba(192,57,43,0.15);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 20px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .divider-text {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .strength-bar {
    height: 3px;
    border-radius: 2px;
    background: var(--border);
    margin-top: 6px;
    overflow: hidden;
  }

  .strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease, background 0.3s ease;
  }

  .forgot-link {
    font-size: 12px;
    color: var(--muted);
    text-decoration: none;
    display: block;
    text-align: right;
    margin-top: 6px;
    transition: color 0.15s;
  }

  .forgot-link:hover { color: var(--accent); }

  .card-footer {
    padding: 0 40px 28px;
    font-size: 11px;
    color: var(--muted);
    text-align: center;
    line-height: 1.6;
  }
`;

function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: "Muy débil", color: "#C0392B" },
    { label: "Débil", color: "#E67E22" },
    { label: "Regular", color: "#F1C40F" },
    { label: "Buena", color: "#27AE60" },
    { label: "Fuerte", color: "#1A7A4A" },
  ];
  return { score, ...map[score] };
}

function PasswordInput({ value, onChange, placeholder, hasError }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-wrap">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={hasError ? "error" : ""}
        style={{ paddingRight: "52px" }}
        required
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShow(!show)}
        tabIndex={-1}
      >
        {show ? "Ocultar" : "Ver"}
      </button>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`toast ${type}`}>
      <span>{type === "success" ? "✓" : "✕"}</span>
      {message}
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Correo inválido";
    if (!password) e.password = "La contraseña es requerida";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess(`Bienvenido de vuelta, ${email.split("@")[0]}`);
  };

  return (
    <div className="form-area">
      <div className="field">
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="nombre@ejemplo.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <div className="error-msg">⚠ {errors.email}</div>}
      </div>
      <div className="field">
        <label>Contraseña</label>
        <PasswordInput
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
          placeholder="Tu contraseña"
          hasError={!!errors.password}
        />
        {errors.password && <div className="error-msg">⚠ {errors.password}</div>}
        <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
      </div>
      <button className={`submit-btn ${loading ? "loading" : ""}`} onClick={handleSubmit} disabled={loading}>
        Iniciar sesión
        {loading && <span className="spinner" />}
      </button>
    </div>
  );
}

function RegisterForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const strength = getPasswordStrength(password);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "El nombre es requerido";
    if (!email) e.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Correo inválido";
    if (!password) e.password = "La contraseña es requerida";
    else if (password.length < 8) e.password = "Mínimo 8 caracteres";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    onSuccess(`Cuenta creada. ¡Bienvenido, ${name.split(" ")[0]}!`);
  };

  return (
    <div className="form-area">
      <div className="field">
        <label>Nombre completo</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <div className="error-msg">⚠ {errors.name}</div>}
      </div>
      <div className="field">
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="nombre@ejemplo.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <div className="error-msg">⚠ {errors.email}</div>}
      </div>
      <div className="field">
        <label>Contraseña</label>
        <PasswordInput
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
          placeholder="Mínimo 8 caracteres"
          hasError={!!errors.password}
        />
        {password && (
          <div style={{ marginTop: 8 }}>
            <div className="strength-bar">
              <div className="strength-fill" style={{
                width: `${(strength.score / 4) * 100}%`,
                background: strength.color
              }} />
            </div>
            <span style={{ fontSize: 11, color: strength.color, marginTop: 3, display: "block" }}>
              {strength.label}
            </span>
          </div>
        )}
        {errors.password && <div className="error-msg">⚠ {errors.password}</div>}
      </div>
      <button className={`submit-btn ${loading ? "loading" : ""}`} onClick={handleSubmit} disabled={loading}>
        Crear cuenta
        {loading && <span className="spinner" />}
      </button>
    </div>
  );
}

export default function AuthApp() {
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState(null);

  const handleSuccess = (msg) => {
    setToast({ message: msg, type: "success" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="wrapper">
        <div className="card">
          <div className="card-top">
            <div className="brand">Acceso seguro</div>
            <h1 className="title">{isLogin ? "Bienvenido\nde vuelta." : "Crea tu\ncuenta."}</h1>
            <p className="subtitle">
              {isLogin ? "Ingresa tus credenciales para continuar" : "Únete en menos de un minuto"}
            </p>
          </div>

          <div className="tab-bar">
            <button className={`tab ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
              Iniciar sesión
            </button>
            <button className={`tab ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>
              Registrarse
            </button>
          </div>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}

          {isLogin
            ? <LoginForm onSuccess={handleSuccess} />
            : <RegisterForm onSuccess={handleSuccess} />
          }

          <div className="card-footer">
            Al continuar, aceptas nuestros Términos de servicio<br />y Política de privacidad.
          </div>
        </div>
      </div>
    </>
  );
}
