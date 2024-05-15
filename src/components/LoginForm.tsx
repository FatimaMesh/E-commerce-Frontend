
export const LoginForm = () => {
  return (
    <>
      <form className="form">
        <p className="form_title title">Login</p>
        <div className="field">
          <input placeholder="Email" className="input" type="email" />
        </div>
        <div className="field">
          <input
            placeholder="Password"
            className="input"
            type="password"
          />
        </div>
        <div className="btn_container">
          <button className="btn_login btn">Login</button>
          <button className="btn_forgot btn">Forgot Password</button>
        </div>
      </form>
    </>
  );
}
