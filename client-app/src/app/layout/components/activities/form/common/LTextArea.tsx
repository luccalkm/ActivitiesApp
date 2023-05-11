import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
}

const LTextArea = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {meta.touched && meta.error ? (
        <textarea className="errorPlaceholder" {...field} {...props} {...{ placeholder: meta.error }} />
      ) : (
        <textarea {...field} {...props} />
      )}
    </Form.Field>
  );
};

export default LTextArea;
