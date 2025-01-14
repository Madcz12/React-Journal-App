//import { Typography } from "@mui/material"
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import {NothingSelectedView } from "../views/";
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  return (
    <JournalLayout>
        {/* <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Nemo nihil harum doloribus quod modi nesciunt neque aperiam. 
          Facilis, et sint? Eveniet ab exercitationem reprehenderit voluptas impedit, 
          dolores quia aliquid distinctio.
        </Typography> */}
        {/* Nothing selected */}
        <NothingSelectedView />
        {/* NoteView */}
        {/* <NoteView/> */}

        <IconButton
          size="large"
          sx={{color:'white', backgroundColor: 'error.main', 
            ':hover': {backgroundColor: 'error.main', opacity: 0.9},
            position: 'fixed', 
            right: 50, 
            bottom: 50 
          }}
        >
          <AddOutlined sx={{fontSize: 30}}/>

        </IconButton>

    </JournalLayout>

  )
}
