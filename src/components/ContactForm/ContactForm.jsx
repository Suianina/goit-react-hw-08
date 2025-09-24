import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { selectContacts } from "../../redux/contacts/selectors";

const phoneRegExp = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{5,}$/;

const normalizePhone = (s = "") => s.replace(/\D/g, "");

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts) || [];

  const ContactsSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .trim()
      .matches(phoneRegExp, "Invalid phone number")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    const name = values.name.trim();
    const number = values.number.trim();
    const nameLower = name.toLowerCase();
    const normalized = normalizePhone(number);

    const nameExists = contacts.some(
      (c) => (c.name || "").trim().toLowerCase() === nameLower
    );
    const numberExists = contacts.some(
      (c) => normalizePhone(c.number || "") === normalized
    );

    if (nameExists || numberExists) {
      toast.error(
        nameExists && numberExists
          ? "A contact with this name and number already exists"
          : nameExists
          ? "A contact with this name already exists"
          : "A contact with this phone number already exists"
      );
      actions.setSubmitting(false);
      return;
    }

    try {
      await dispatch(addContact({ name, number })).unwrap();
      toast.success("Contact added successfully", { duration: 3000 });
      actions.resetForm();
    } catch (err) {
      toast.error(err?.message || "Failed to add contact");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ id: "", name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={ContactsSchema}
      validateOnBlur
      validateOnChange
    >
      {({ isSubmitting }) => (
        <Form className={css.form} noValidate>
          <div className={css.group}>
            <label className={css.label} htmlFor="name-field">
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              id="name-field"
              autoComplete="name"
              placeholder="John Doe"
            />
            <div className={css.errorSlot}>
              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </div>
          </div>

          <div className={css.group}>
            <label className={css.label} htmlFor="number-field">
              Number
            </label>
            <Field
              className={css.field}
              type="tel"
              name="number"
              id="number-field"
              autoComplete="tel"
              placeholder="+380 67 123 45 67"
            />
            <div className={css.errorSlot}>
              <ErrorMessage
                className={css.error}
                name="number"
                component="span"
              />
            </div>
          </div>

          <button className={css.btn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding…" : "Add contact"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
