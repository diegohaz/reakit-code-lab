import * as React from "react";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormRemoveButton as FormRemoveButton,
  unstable_FormPushButton as FormPushButton,
} from "reakit";
import cx from "../utils/cx";

type Props = React.FormHTMLAttributes<HTMLFormElement>;

const PrimaryForm = React.forwardRef<HTMLFormElement, Props>((props, ref) => {
  const form = useFormState({
    values: {
      name: "",
      friends: [{ name: "" }],
    },
    onValidate: (values) => {
      const errors = {} as typeof values;
      if (!values.name) {
        errors.name = "Name is required";
      }
      values.friends.forEach((friend, i) => {
        if (!errors.friends) {
          errors.friends = [];
        }
        if (!friend.name) {
          errors.friends[i] = { name: "Friend name is required" };
        }
      });
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
  });

  return (
    <Form {...form} {...props} ref={ref}>
      <div className="components-base-control">
        <div className="components-base-control__field">
          <FormLabel
            {...form}
            name="name"
            className="components-base-control__label"
          >
            Name
          </FormLabel>
          <FormInput
            {...form}
            type="text"
            name="name"
            placeholder="Jane Doe"
            className="components-text-control__input"
          />
          <FormMessage {...form} name="name" className="error-message" />
        </div>
      </div>
      {form.values.friends.map((_, i) => (
        <div className="components-base-control" key={i}>
          <div className="components-base-control__field">
            <FormLabel
              {...form}
              name={["friends", i, "name"]}
              className="components-base-control__label"
            >
              Friend name
            </FormLabel>
            <FormInput
              {...form}
              type="text"
              name={["friends", i, "name"]}
              placeholder="John Doe"
              className="components-text-control__input"
            />
            <FormMessage
              {...form}
              name={["friends", i, "name"]}
              className="error-message"
            />
          </div>
          <FormRemoveButton
            {...form}
            name="friends"
            index={i}
            className="components-button is-secondary is-small"
          >
            Remove friend
          </FormRemoveButton>
        </div>
      ))}
      <br />
      <FormPushButton
        {...form}
        name="friends"
        value={{ name: "" }}
        className="components-button is-secondary"
      >
        Add friend
      </FormPushButton>{" "}
      <FormSubmitButton
        {...form}
        className={cx("components-button is-primary")}
      >
        Submit
      </FormSubmitButton>
    </Form>
  );
});

export default PrimaryForm;
