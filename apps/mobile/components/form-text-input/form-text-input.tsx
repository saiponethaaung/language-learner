import { StyleSheet, TextInput } from "react-native";
import { useController } from "react-hook-form";

export default function FormTextInput(props: any) {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  });

  return (
    <TextInput
      {...props}
      style={styles.textInput}
      ref={field.ref}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    // backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
  },
});
