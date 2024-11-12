/* eslint-disable react/prop-types */
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useController } from "react-hook-form";

const RHFCheckBox = ({ name, control, rules, defaultValue, ...props }) => {
    const { field } = useController({ name, control, defaultValue, rules })

    return (
        <FormControl sx={props.sx} disabled={props.disabled}>
            <FormControlLabel
                label={props.label}
                control={(
                    <Checkbox
                        color="secondary"
                        onChange={(e) => { field.onChange(e); props.onChange(e) }}
                        onBlur={field.onBlur}
                        name={field.name}
                        checked={Boolean(field.value)} />
                )} />
        </FormControl>
    )
}

export default RHFCheckBox

RHFCheckBox.defaultProps = {
    defaultValue: false,
    label: "",
    required: false,
    disabled: false,
    onChange: () => { },
    sx: {}
};