import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./RegisterPage.css";

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("");
  const [phone_prefix, setPhonePrefix] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [birth_date, setBirthDate] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(
      email,
      password,
      password2,
      first_name,
      last_name,
      gender,
      phone_prefix,
      phone_number,
      birth_date
    );
  };

  return (
    <section className="vh-100 gradient-custom-registration">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form onSubmit={handleSubmit} className="center">
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="first_name"
                          className="form-control"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="first_name">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="last_name"
                          className="form-control"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="last_name">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form6Example3">
                      Email
                    </label>
                  </div>

                  {/* <!-- birthdate choice input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      id="birth_date"
                      className="form-control"
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="birth_date">
                      Birthday
                    </label>
                  </div>

                  {/* <!-- password input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form6Example4">
                      Password
                    </label>
                  </div>

                  {/* <!-- password2 input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password2"
                      className="form-control"
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form6Example5">
                      Confirm Password
                    </label>
                  </div>

                  {/* <!-- gender choice input --> */}
                  <h6 className="mb-2 pb-1">Gender: </h6>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="femaleGender"
                      value="f"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label className="form-check-label" htmlFor="femaleGender">
                      Female
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="maleGender"
                      value="m"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label className="form-check-label" htmlFor="maleGender">
                      Male
                    </label>
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      {/* <!-- phone prefix input --> */}
                      <div className="form-outline mb-2">
                        <input
                          type="tel"
                          id="phone_prefix"
                          className="form-control"
                          pattern="[+0-9]{3}"
                          onChange={(e) => {
                            setPhonePrefix(e.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="phone_prefix">
                          Phone prefix <span> (format : +33)</span>
                        </label>
                      </div>
                    </div>
                    {/* <!-- phone number input --> */}
                    <div className="col">
                      <div className="form-outline mb-2">
                        <input
                          type="tel"
                          id="phone_number"
                          className="form-control"
                          pattern="[0-9]{9}"
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="phone_number">
                          Phone number <span> (format : 605438481)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    {" "}
                    Register{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
