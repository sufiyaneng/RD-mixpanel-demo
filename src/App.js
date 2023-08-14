import React, { useState, useEffect } from "react";
import mixpanel from "mixpanel-browser";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    mobile: ""
  });

  useEffect(() => {
    mixpanel?.init("e4cd90c0407ce5e475918b32acfc4ad9", {
      debug: true,
      ignore_dnt: true
    });
    mixpanel.identify("8787");
    // Set user properties
    mixpanel.people.set({
      $email: "sufiyan@example.com",
      $name: "sufiyan",
      plan: "premium"
      // Other custom properties
    });
    mixpanel.register({
      source: "organic",
      platform: "web"
    });

    mixpanel?.track("Page View");
  }, []);
  // Track page view

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    mixpanel.track("Input Filled", {
      InputName: name,
      Filled: value !== ""
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    mixpanel.track("Submit", { Name: "Naveen" });
    mixpanel.track("Sign Up", {
      "Signup Type": "Referral"
    });

    // Add your form submission logic here
  };

  return (
    <div className="container mt-5">
      <h1>Enquiry Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course
          </label>
          <input
            type="text"
            className="form-control"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
