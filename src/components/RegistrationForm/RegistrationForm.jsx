import css from './RegistrationForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { registerAuth } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

const RegistrationForm = () => {
  const nameField = 'name-field';
  const emailField = 'email-field';
  const passwordField = 'password-field';
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  
  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Too Short!')
      .max(50, "Too Long!"),
    
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email')
      .min(8, 'Email should contain at least 8 characters')
      .max(50, "Too Long!"),
    
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password should contain at least 8 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
      'Password should contain at least one letter, one number, and one special character'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(registerAuth({
      name: values.name,
      email: values.email,
      password: values.password,
    }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: ""
      }}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form className={css.form}>
        <label className={css.name} htmlFor={nameField}>
          Name
        </label>
        <Field 
          className={css.field} 
          type="text" 
          name="name" 
          id={nameField} 
          placeholder="Please enter your name"
        />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.name} htmlFor={emailField}>
          Email
        </label>
        <Field
          className={css.field}
          type="text"
          name="email"
          id={emailField}
          placeholder="example@gmail.com"
        />
        <ErrorMessage className={css.error} name="email" component="span" />

        <label className={css.name} htmlFor={passwordField}>
          Password
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          id={passwordField}
          placeholder="Please enter the password"
        />
        <ErrorMessage className={css.error} name="password" component="span" />
        <button className={css.btn} type="submit">
          Register
        </button>

        {error && <p className={css.error}>Something went wrong {error}</p>}
      </Form>
    </Formik>
  );
}

export default RegistrationForm;