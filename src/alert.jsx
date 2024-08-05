import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
export default function ColorAlerts() {
  return (
    <div className='fixed-top'>
      <Stack className='stack' sx={{ width: '30%', 
        
        justifyContent: 'flex-end',
         marginLeft: 'auto',
         '@media (max-width: 992px)':{
            width:'100%',
            padding:'20px'
         }
         }} spacing={2}>
        <Alert 
        
        variant="filled" severity="success" className='mt-4'>
        Updates sent to parent portal.
        <LinearProgress   color="inherit"/>

        </Alert>
      </Stack>
    </div>
  );
}