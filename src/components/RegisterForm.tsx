export const RegisterForm = () => {
  return (
    <>
      <form className="form">
        <p className="form_title title">Register</p>
        <div className="field">
          <input placeholder="Full name" className="input" type="text" />
        </div>
        <div className="field">
          <input
            placeholder="Password"
            className="input"
            type="password"
          />
        </div>
        <div className="field">
          <input placeholder="Email" className="input" type="email" />
        </div>
        <div className="field">
          <input placeholder="Phone" className="input" type="text" />
        </div>
        <div className="btn_container">
          <button className="btn_register btn">Register</button>
        </div>
      </form>
    </>
  );
};
