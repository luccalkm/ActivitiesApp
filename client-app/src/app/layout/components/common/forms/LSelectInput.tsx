import { useField } from "formik";
import { Form, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  options: any;
}

const LSelectArea = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {meta.touched && meta.error ? (
        <Select 
          clearable
          className="errorPlaceholder"
          {...props} {...{ placeholder: meta.error }}
          options={props.options}
          value={field.value || null}
          onChange={(event, data) => { helpers.setValue(data.value) }}
          onBlur={() => { helpers.setTouched(true) }}
          />
      ) : (
        <Select 
          clearable
          placeholder="Category"
          options={props.options}
          value={field.value || null}
          onChange={(event, data) => { helpers.setValue(data.value) }}
          onBlur={() => { helpers.setTouched(true) }}
          />
      )}
    </Form.Field>
  );
};

export default LSelectArea;
