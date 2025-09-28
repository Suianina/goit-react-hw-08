import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registerAuth } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

const RegistrationForm = () => {
  const nameField = "name-field";
  const emailField = "email-field";
  const passwordField = "password-field";
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const errText = (e) => (typeof e === "string" ? e : e?.message ?? "");

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),

    email: Yup.string()
      .trim()
      .required("Email is required")
      .email("Invalid email")
      .max(50, "Too Long!"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should contain at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/,
        "Password should contain at least one letter, one number, and one special character"
      ),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        registerAuth({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        })
      ).unwrap();
      actions.resetForm();
    } catch (e) {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form} noValidate>
          <div className={css.group}>
            <label className={css.label} htmlFor={nameField}>
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              id={nameField}
              placeholder="Please enter your name"
              autoComplete="name"
              aria-invalid={touched.name && !!errors.name}
            />
            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage
                name="name"
                component="span"
                className={css.errorText}
              />
            </div>
          </div>

          <div className={css.group}>
            <label className={css.label} htmlFor={emailField}>
              Email
            </label>
            <Field
              className={css.field}
              type="email"
              name="email"
              id={emailField}
              placeholder="example@gmail.com"
              autoComplete="email"
              aria-invalid={touched.email && !!errors.email}
            />
            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorText}
              />
            </div>
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
              placeholder="Please enter the password"
              autoComplete="new-password"
              aria-invalid={touched.password && !!errors.password}
            />
            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage
                name="password"
                component="span"
                className={css.errorText}
              />
            </div>
          </div>

          <button
            className={css.btn}
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            Register
          </button>

          <div className={css.errorGlobalSlot} aria-live="polite">
            <span className={css.errorGlobalText}>
              {error && `Something went wrong ${errText(error)}`}
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
