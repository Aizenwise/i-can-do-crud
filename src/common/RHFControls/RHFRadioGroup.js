/* eslint-disable react/prop-types */

import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next"

const RHFRadioGroup = ({ name, control, rules, defaultValue, getLookupId, getLookupText, ...props }) => {
    const { t } = useTranslation();
    const { field, fieldState: { invalid, error } } = useController({ name, control, defaultValue, rules: { ...rules, required: { value: props.required, message: t("strRequiredField") } } })

    return (
        <FormControl sx={{ m: 0, ...props.sx }} disabled={props.disabled} error={invalid} required={props.required}>
            <FormLabel>{props.label}</FormLabel>
            <RadioGroup
                onChange={(e) => { field.onChange(e); props.onChange(e) }}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                row={props.row}
            >
                {props.options.map(item => <FormControlLabel key={item.value} control={<Radio />} value={getLookupId(item)} label={getLookupText(item)} />)}
            </RadioGroup>
            {error && <FormHelperText sx={{ margin: 0 }}>{error.message}</FormHelperText>}
        </FormControl >
    )
}

export default RHFRadioGroup

RHFRadioGroup.defaultProps = {
    defaultValue: "",
    label: "",
    required: false,
    disabled: false,
    options: [],
    getLookupId: item => item.intLookupId,
    getLookupText: item => item.strLookupText,
    onChange: () => { },
    row: true,
    sx: {}
};