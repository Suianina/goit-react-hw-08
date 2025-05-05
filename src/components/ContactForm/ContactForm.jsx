import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
  const nameFieldId = 'name-field';
  const numberFieldId = 'number-field';
  const dispatch = useDispatch();

  const ContactsSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, "Too Long!").required("Required"),
    number: Yup.string().min(3, 'Too Short!').max(50, "Too Long!").required("Required")
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact({
      name: values.name,
      number: values.number,
    }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        id: '',
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={ContactsSchema}
    >
      <Form className={css.form}>
        <label className={css.name} htmlFor={nameFieldId}>
          Name
        </label>
        <Field className={css.field} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.name} htmlFor={numberFieldId}>
          Number
        </label>
        <Field
          className={css.field}
          type="text"
          name="number"
          id={numberFieldId}
        />
        <ErrorMessage className={css.error} name="number" component="span" />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;