/* eslint-disable react/prop-types */


import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const LogoutModal = ({open, onClose, onLogout }) => {


  return (
    <div>
    
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutModal;