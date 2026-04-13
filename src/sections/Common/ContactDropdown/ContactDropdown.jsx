"use client";

import { useEffect } from "react";
import niceSelect from "react-nice-select";

const ContactDropdown = () => {
  useEffect(() => {
    niceSelect();
  }, []);
  const defaultValue = 'Your Inquiry';
  const options = [
    { value: 'Web Design', label: 'Web Design' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Engine Diagnostics', label: 'Engine Diagnostics' },
    { value: 'Digital Marketing', label: 'Digital Marketing' }
  ];
  return (

    <div className="col-md-6">
      <div className="form-group custom-form-design">
        <select
          name="subject"
          id="subject"
          className="single-select nice-select form-select"
        >
          <option value="" disabled selected hidden>
            {defaultValue}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ContactDropdown;
