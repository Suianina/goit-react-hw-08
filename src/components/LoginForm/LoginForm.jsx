import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const emailField = "email-field";
  const passwordField = "password-field";

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should contain 8 symbols")
      .max(30, "Too long"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is incorrect"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(login({ email: values.email, password: values.password }));
    actions.resetForm();
    navigate("/");
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={css.form}>
        <div className={css.group}>
          <label className={css.label} htmlFor={emailField}>
            Email
          </label>
          <Field
            className={css.field}
            type="text"
            name="email"
            id={emailField}
            placeholder="example2091@gmail.com"
            autoComplete="email"
          />
          <ErrorMessage className={css.error} name="email" component="div" />
        </div>
        <div className={css.group}>
          <label className={css.label} htmlFor={passwordField}>
            Password
          </label>
          <Field
            className={css.field}
            type="password"
            name="password"
            id={passwordField}
            placeholder="please enter password"
            autoComplete="current-password"
          />
          <ErrorMessage className={css.error} name="password" component="div" />
        </div>
        <button className={css.btn} type="submit">
          Log In
        </button>
        <div className={css.errorGlobalSlot}>
          <span className={css.errorGlobalText}>
            {error ? `Something went wrong ${error}` : ""}
          </span>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
