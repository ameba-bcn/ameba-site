import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SociEstat from './taules/estatusSoci';
import Compres from './taules/compres';
import Socis from './taules/socis';
import Power from '../components/layout/powerTitle';
import HeaderMenu from '../components/headerMenu';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <HeaderMenu/>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          // variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab label="EL MEU COMPTE" {...a11yProps(0)} />
          <Tab label="LES MEVES COMPRES" {...a11yProps(1)} />
          <Tab label="SUPPORTYOURLOCALS" {...a11yProps(2)} />
          <Tab label="NOTÍCIES" {...a11yProps(3)} />
          <Tab label="LLISTAT SOCIS" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SociEstat/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Compres/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Power title='PERAS'/> 
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Socis/>
      </TabPanel>

    </div>
    </>
  );
}

        // <Tab label="EL MEU PERFIL" {...a11yProps(0)} />
        // <Tab label="LES MEVES COMPRES" />
        // <Tab label="5 CÈNTIMS" />
        // <Tab label="NOTÍCIES" />
        // <Tab label="LLISTAT SOCIS" />