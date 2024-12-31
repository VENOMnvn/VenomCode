import './register.css';

const Register = ()=>{
    return <div className="form-v10">
    <div className="page-content">
  <div className="form-v10-content">
    <form className="form-detail" action="#" method="post" id="myform">
      <div className="form-left">
        <h2>General Infomation</h2>
        <div className="form-row">
          <select name="title">
            <option className="option" value="title">
              Title
            </option>
            <option className="option" value="businessman">
              Student
            </option>
            <option className="option" value="reporter">
              Web Developer
            </option>
            <option className="option" value="secretary">
              App Developer
            </option>
          </select>
          <span className="select-btn">
            <i className="zmdi zmdi-chevron-down" />
          </span>
        </div>
        <div className="form-group">
          <div className="form-row form-row-1">
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="input-text"
              placeholder="First Name"
              required=""
            />
          </div>
          <div className="form-row form-row-2">
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="input-text"
              placeholder="Last Name"
              required=""
            />
          </div>
        </div>
        <div className="form-row">
          <select name="position">
            <option value="position">Position</option>
            <option value="director">Student</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
          <span className="select-btn">
            <i className="zmdi zmdi-chevron-down" />
          </span>
        </div>
        <div className="form-row">
          <input
            type="text"
            name="company"
            className="company"
            id="company"
            placeholder="Company"
            required=""
          />
        </div>
        <div className="form-group">
          <div className="form-row form-row-3">
            <input
              type="text"
              name="business"
              className="business"
              id="business"
              placeholder="Business Arena"
              required=""
            />
          </div>
          <div className="form-row form-row-4">
            <select name="employees">
              <option value="employees">Employees</option>
              <option value="trainee">Trainee</option>
              <option value="colleague">Colleague</option>
              <option value="associate">Associate</option>
            </select>
            <span className="select-btn">
              <i className="zmdi zmdi-chevron-down" />
            </span>            
          </div>
          
        </div>
      </div>
      <div className="form-right">
        <h2>Contact Details</h2>
        <div className="form-row">
          <input
            type="text"
            name="street"
            className="street"
            id="street"
            placeholder="Street + Nr"
            required=""
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="additional"
            className="additional"
            id="additional"
            placeholder="Additional Information"
            required=""
          />
          
        </div>
        <div className="form-group">
          
        </div>
        <div className="form-row">
          <select name="country">
            <option value="country">Country</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Malaysia">Malaysia</option>
            <option value="India">India</option>
          </select>
          <span className="select-btn">
            <i className="zmdi zmdi-chevron-down" />
          </span>
        </div>
        <div className="form-group">
          <div className="form-row form-row-1">
            <input
              type="text"
              name="code"
              className="code"
              id="code"
              placeholder="Code +"
              required=""
            />
          </div>
          <div className="form-row form-row-2">
            <input
              type="text"
              name="phone"
              className="phone"
              id="phone"
              placeholder="Phone Number"
              required=""
            />
          </div>
        </div>
        <div className="form-row">
          <input
            type="text"
            name="your_email"
            id="your_email"
            className="input-text"
            required=""
            pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
            placeholder="Your Email"
          />
        </div>
        <div className="form-checkbox">
          <label className="container">
            <p>
              I do accept the{" "}
              <a className="text">
                Terms and Conditions
              </a>{" "}
              of your site.
            </p>
            <input type="checkbox" name="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
        <label className="container">
            <p>
              Have a account ?   {"    "}
              <a className="">
                Signin 
              </a>{" "}
              {" "}
              instead
            </p>
            <span className="checkmark" />
          </label>
        <div className="form-row-last">
          <input
            type="submit"
            name="register"
            className="register"
            defaultValue="Register Badge"
          />
        </div>
      </div>
    </form>
  </div>
</div>

    
    </div>;
}

export default Register;