import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './sidebar.css';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} className="icone-menu">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} classes={{ paper: 'painel-lateral' }}>
        <List>
          {['Agendamentos confirmados', 'Agendamentos a confirmar', 'Agendamentos cancelados', 'Consultas já realizadas', 'Personalizar agenda'].map((text, index) => (
            <ListItem button key={index} className="item-lista">
              <ListItemText primary={text} classes={{ primary: 'texto-item-lista' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
