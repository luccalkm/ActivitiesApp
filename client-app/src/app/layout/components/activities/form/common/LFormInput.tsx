import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

const LFormInput = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {meta.touched && meta.error ? (
        <input className="errorPlaceholder" {...field} {...props} {...{ placeholder: meta.error }} />
      ) : (
        <input {...field} {...props} />
      )}
    </Form.Field>
  );
};

export default LFormInput;
