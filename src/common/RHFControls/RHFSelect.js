/* eslint-disable react/prop-types */

import { MenuItem, TextField } from "@mui/material"
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next"

const RHFSelect = ({ name, control, rules, defaultValue, getLookupId, getLookupText, onChange, options, ...props }) => {
    const { t } = useTranslation();
    const { field, fieldState: { invalid, error } } = useController({ name, control, defaultValue, rules: { ...rules, required: { value: props.required, message: t("strRequiredField") } } })
    return (
        <TextField
            onChange={(e) => { field.onChange(e); onChange(e) }}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            inputRef={field.ref}
            error={invalid}
            helperText={error?.message}
            select
            {...props}
        >
            <MenuItem key="" value="">{t("strSelect")}</MenuItem>
            {options?.map((item) => (
                <MenuItem key={getLookupId(item)} value={getLookupId(item)}>
                    {getLookupText(item)}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default RHFSelect

RHFSelect.defaultProps = {
    defaultValue: "",
    required: false,
    options: [],
    getLookupId: item => item.intLookupId,
    getLookupText: item => item.strLookupText,
    onChange: () => { },
};