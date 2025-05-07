import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const nameField = 'name-field';
  const numberField = 'number-field';
  const dispatch = useDispatch();

  const ContactsSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, "Too Long!").required("Required"),
    number: Yup.string().min(3, 'Too Short!').max(50, "Too Long!").required("Required")
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact({
      name: values.name,
      number: values.number,
    }))
    .unwrap()
    .then(() => {
      toast.success('Contact added successesfully', {
        duration: 3000,
    });
    });
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
        <label className={css.name} htmlFor={nameField}>
          Name
        </label>
        <Field className={css.field} type="text" name="name" id={nameField} />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.name} htmlFor={numberField}>
          Number
        </label>
        <Field
          className={css.field}
          type="text"
          name="number"
          id={numberField}
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