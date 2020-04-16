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
      <FormLabel {...form} name="name">
        Name
      </FormLabel>
      <FormInput {...form} name="name" placeholder="John Doe" />
      <FormMessage {...form} name="name" />
      {form.values.friends.map((_, i) => (
        <React.Fragment key={i}>
          <FormLabel {...form} name={["friends", i, "name"]}>
            Friend name
          </FormLabel>
          <FormInput {...form} name={["friends", i, "name"]} />
          <FormMessage {...form} name={["friends", i, "name"]} />
          <FormRemoveButton {...form} name="friends" index={i}>
            Remove friend
          </FormRemoveButton>
        </React.Fragment>
      ))}
      <FormPushButton {...form} name="friends" value={{ name: "" }}>
        Add friend
      </FormPushButton>
      <br />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
});

export default PrimaryForm;
