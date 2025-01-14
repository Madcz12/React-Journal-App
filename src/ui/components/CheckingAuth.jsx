import { CircularProgress, Grid } from '@mui/material';

export const CheckingAuth = () => {
  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '100vh', backgroundColor: 'primary.main', paddin: 4}}
    >
        <Grid container 
            direction='row' justifyContent='center'
            sx={{ width: { md: 450 } }}>
            <CircularProgress color='warning' />
        </Grid>
    </Grid>
  )
}
