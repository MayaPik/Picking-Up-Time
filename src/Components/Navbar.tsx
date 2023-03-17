import { useStore } from "../store";
import { Box, Fab } from "@mui/material";

export const Navbar: React.FC = () => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  function handleChangeLanguage() {
    let newLanguage;
    language === "eng" ? (newLanguage = "heb") : (newLanguage = "eng");
    setLanguage(newLanguage);
  }

  return (
    <Box
      sx={{
        width: 120,
        paddingTop: 2,
        paddingLeft: 2,
      }}
    >
      <Fab
        variant="extended"
        size="medium"
        color="secondary"
        onClick={handleChangeLanguage}
      >
        {language === "eng" ? "English" : "עברית"}
      </Fab>
    </Box>
  );
};
