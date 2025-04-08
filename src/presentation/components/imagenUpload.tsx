import React, { useState, useEffect } from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  initialImage?: string; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, initialImage }) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const theme = useTheme();

  useEffect(() => {
    setPreview(initialImage || null);
  }, [initialImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      borderRadius={3}
      boxShadow={3}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: "20px",
          backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#f0f0f0",
          border: `2px dashed ${theme.palette.mode === "dark" ? "#ccc" : "#999"}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          position: "relative",
          overflow: "hidden",
          mb: 2,
        }}
      >
        {preview ? (
          <Box
            component="img"
            src={preview}
            alt="Vista previa"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "18px",
            }}
          />
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <ImageIcon sx={{ fontSize: 50, color: "#666" }} />
            <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
              No hay imagen
            </Typography>
          </Box>
        )}
      </Box>

      <Box display="flex" gap={2} width="100%">
        <input
          accept="image/*"
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="upload-button" style={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadIcon />}
          >
            Subir Imagen
          </Button>
        </label>

        {preview && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleRemoveImage}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
