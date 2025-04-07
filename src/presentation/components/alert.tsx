import React from "react";
import {
  Alert,
  AlertTitle,
  IconButton,
  Stack,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AlertProps {
  severity: "error" | "warning" | "info" | "success";
  title?: string;
  message: string;
  onClose?: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({
  severity,
  title,
  message,
  onClose,
}) => {
  return (
    <Slide direction="down" in mountOnEnter unmountOnExit>
      <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
        <Alert
          severity={severity}
          variant="outlined"
          action={
            onClose && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
          sx={{
            alignItems: "flex-start",
            borderRadius: 2,
            borderLeft: "5px solid",
            borderColor: (theme) => theme.palette[severity].main,
            boxShadow: 2,
            typography: "body2",
            textAlign: "justify",
          }}
        >
          <div>
            {title && (
              <AlertTitle sx={{ fontWeight: "bold" }}>
                {title}
              </AlertTitle>
            )}
            {message}
          </div>
        </Alert>
      </Stack>
    </Slide>
  );
};

export default CustomAlert;
