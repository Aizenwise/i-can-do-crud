/* eslint-disable react/prop-types */

import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

const RHFTextField = ({ name, control, rules, defaultValue, ...props }) => {
    const { t } = useTranslation();
    const { field, fieldState: { invalid, error } } = useController({ name, control, defaultValue, rules: { ...rules, required: { value: props.required, message: t("strRequiredField") } } })

    return (
        <TextField
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            inputRef={field.ref}
            error={invalid}
            helperText={error?.message}
            {...props}
        />
    );
};

export default RHFTextField;

RHFTextField.defaultProps = {
    defaultValue: "",
    required: false
};
