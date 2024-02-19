import { TextField } from "@mui/material";
import "../addEmployeeForm/employeeForm.css";

interface requiredFieldProps {
  requiredFields: string[];
  onChange: (fieldName: string, value: string) => void;
  value: string | undefined;
  error: boolean;
  helpertext: string;
}

export const RequiredField: React.FC<requiredFieldProps> = ({
  requiredFields,
  onChange,
  value,
  error,
  helpertext,
}) => {
  if (error) {
  } else helpertext = "";
  return (
    <div className="textField">
      {requiredFields.map((fieldName) => (
        <TextField
          fullWidth
          key={fieldName}
          required
          id={fieldName}
          label={fieldName}
          value={value}
          onChange={(e) => {
            onChange(fieldName, e.target.value);
          }}
          error={error}
          helperText={helpertext}
        />
      ))}
    </div>
  );
};
