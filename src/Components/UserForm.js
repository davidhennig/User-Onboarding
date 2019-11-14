import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// removed:
// state
// handleSubmit
// onChange
const UserForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}
        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && (
          <p className="errors">{errors.email}</p>
        )}
        <Field type="text" name="password" placeholder="password" />
        {touched.password && errors.password && (
          <p className="errors">{errors.password}</p>
        )}
        <label className="checkbox-container">
          I AGREE TO THE TERMS OF SERVICE
          <Field type="checkbox" name="agree" checked={values.agree} />
          <span className="checkmark" />
        </label>
        <Field as="textarea" type="text" name="notes" placeholder="notes" />
        <button>Submit!</button>
      </Form>
      {user.map(user => (
        <ul key={user.id}>
          <li>Species: {user.species}</li>
          <li>Size: {user.size}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, agree, notes }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      agree: agree || false,
      notes: notes || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required()
  }),
  handleSubmit(values, { setStatus }) {
    // values is our object with all our data on it
    axios
      .post("https://reqres.in/api/user", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;
console.log("This is the HOC", FormikUserForm);
