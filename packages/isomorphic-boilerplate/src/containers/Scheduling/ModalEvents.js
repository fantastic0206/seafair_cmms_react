import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Input, { Textarea } from '@iso/components/uielements/input';
import { DateRangepicker } from '@iso/components/uielements/datePicker';
import Modal from '@iso/components/Feedback/Modal';
import { CalendarModalBody } from './Calendar.styles';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteButton from './DeleteButton';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import siteConfig from '@iso/config/site.config';
import axios from 'axios';

const RangePicker = DateRangepicker;

const localeDatePicker = {
  lang: {
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: 'Ok',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: 'Select time',
    dateSelect: 'Select date',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
};

export default function ({ modalVisible, selectedData, setModalData }) {
  const handleOk = () => {
    // console.log(note)
    // console.log(shift)
    // console.log(area)
    // console.log(begin)
    // console.log(finish)
    // console.log(mbreak)
    // console.log(rbreak)
    // console.log(selectedData)
    setModalData('ok', selectedData);

    let data = {
      note: note,
      shift: shift,
      area: area,
      begin: begin,
      finish: finish,
      mbreak: mbreak,
      rbreak: rbreak,
    };

    axios
      .post(`${siteConfig.apiUrl}/auth/schedule`, data)
      .then((res) => res)
      .catch((error) => error);
  };
  const handleCancel = () => {
    setModalData('cancel');
  };

  const handleDelete = () => {
    setModalData('delete', selectedData);
  };
  const visible = !!modalVisible;
  if (!visible) return null;

  const title = selectedData && selectedData.title ? selectedData.title : '';
  const desc = selectedData && selectedData.desc ? selectedData.desc : '';
  const start =
    selectedData && selectedData.start ? moment(selectedData.start) : '';
  const end = selectedData && selectedData.end ? moment(selectedData.end) : '';
  const onChangeTitle = (event) => {
    selectedData.title = event.target.value;
    setModalData('updateValue', selectedData);
  };
  const onChangeDesc = (event) => {
    selectedData.desc = event.target.value;
    setModalData('updateValue', selectedData);
  };
  const onChangeFromTimePicker = (value) => {
    try {
      selectedData.start = value[0].toDate();
      selectedData.end = value[1].toDate();
    } catch (e) {}
    setModalData('updateValue', selectedData);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  const myuseStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },

    modal_width: {
      width: '1000px  !important',
    },

    avatar_div: {
      textAlign: 'center',
    },

    avatar_cls: {
      margin: '0 auto 7px',
      color: '#fff',
      backgroundColor: '#FA5FD5',
      height: '75px',
      width: '75px',
      fontSize: '45px',
    },

    left: {
      width: '33%',
      borderRightColor: 'lightgray',
      borderRightWidth: 0.55,
      borderRightStyle: 'solid',
    },

    left_avatar: {
      color: '#2c2929',
      backgroundColor: 'transparent',
    },

    right: {
      width: '67%',
      padding: '20px',
    },
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    textarea: {
      width: '100%',
    },
    select_opt: {
      width: '290px',
    },
    label_div: {
      paddingBottom: '50px',
    },
    label_title: {
      fontWeight: 'bold',
      color: 'black !important',
      fontSize: '25px  !important',
    },
    label_input: {
      paddingBottom: '12px',
      fontWeight: '600',
    },
    checkbox: {
      paddingBottom: '20px',
    },
    button_open: {
      backgroundColor: '#fa5fd5 !important',
    },
    grid: {
      padding: '0px 7px',
    },
    icon_settings: {
      paddingRight: '5px',
      color: '#1890ff',
    },
    label_Editinput: {
      paddingBottom: '12px',
      fontWeight: '600',
      display: 'initial',
      color: '#1890ff',
    },
    icon_info: {
      fontSize: '20px',
      color: '#918989',
    },
    icon_info_about: {
      color: '#918989',
      fontSize: '15px',
      paddingLeft: '5px',
    },
    iconStatBar: {
      float: 'right',
      border: '1px solid lightgrey',
      fontSize: '20px',
      padding: '0px 10px',
    },
    addBtn: {
      color: '#1890ff',
      borderColor: '#1890ff',
    },
  }));

  const myclasses = myuseStyles();
  const [note, setNote] = useState(null);
  const [shift, setShift] = useState('Open Shift');
  const [area, setArea] = useState('Sales');
  const [begin, setBegin] = useState(null);
  const [finish, setFinish] = useState(null);
  const [mbreak, setMbreak] = useState(null);
  const [rbreak, setRbreak] = useState(null);

  const working = [
    {
      value: 'Open Shift',
      label: 'Open Shift',
    },
  ];

  const area_arr = [
    {
      value: 'Sales',
      label: 'Sales',
    },
  ];

  return (
    <div>
      <Modal
        className={myclasses.modal_width}
        title={modalVisible === 'update' ? 'Update Event' : 'Set Event'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <CalendarModalBody>
          {/* <div className="isoCalendarInputWrapper">
            <Input
              value={title}
              placeholder="Set Title"
              onChange={onChangeTitle}
            />
          </div>

          <div className="isoCalendarInputWrapper">
            <Input
              value={desc}
              placeholder="Set Description"
              onChange={onChangeDesc}
            />
          </div>

          <div className="isoCalendarDatePicker">
            <RangePicker
              locale={localeDatePicker}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment(), moment().endOf('month')],
              }}
              value={[start, end]}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onChangeFromTimePicker}
            />
            <DeleteButton handleDelete={handleDelete} />
          </div> */}
          {/* <div className={classes.root}>
            <Grid container>
              <Grid item xs={4}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper}>xs=8</Paper>
              </Grid>
            </Grid>
          </div> */}
          <div className={myclasses.root}>
            <div className={myclasses.left}>
              {/* <div >
                <Avatar className={myclasses.avatar_cls}>
                  <i className="ion-clock" />
                </Avatar>
              </div>

              <Grid container>
                <Grid item xs={12}>
                <span >
                  <i className="ion-calendar" />
                  <span className="nav-text">
                    0
                  </span>
                </span>
                </Grid>
              </Grid> */}

              <div className={myclasses.avatar_div}>
                <Avatar className={myclasses.avatar_cls}>
                  <i className="ion-clock" />
                </Avatar>
                <h3>Open Shift</h3>
              </div>

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={myclasses.left_avatar}>
                      <i className="ion-calendar" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="0" secondary="Weekly Hours" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={myclasses.left_avatar}>
                      <i className="ion-social-usd" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="0" secondary="Weekly Cost" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={myclasses.left_avatar}>
                      <i className="ion-clock" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="7.50" secondary="Shift Length" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={myclasses.left_avatar}>
                      <i className="ion-person" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="-" secondary="Shift Cost" />
                </ListItem>
              </List>
            </div>
            <div className={myclasses.right}>
              <Grid container className={myclasses.label_div}>
                <Grid item xs={6}>
                  <div>
                    <InputLabel
                      id="demo-controlled-open-select-label"
                      className={myclasses.label_title}
                    >
                      New Shift on Thu 01 Oct
                    </InputLabel>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    className={myclasses.button_open}
                  >
                    Open
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <div>
                    <InputLabel
                      className={myclasses.label_input}
                      id="demo-controlled-open-select-label"
                    >
                      Who is working
                    </InputLabel>
                  </div>
                  <TextField
                    className={myclasses.select_opt}
                    select
                    variant="outlined"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  >
                    {working.map((data) => {
                      return (
                        <MenuItem key={data.value} value={data.value}>
                          {data.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={6}>
                      <div>
                        <InputLabel
                          className={myclasses.label_input}
                          id="demo-controlled-open-select-label"
                        >
                          In which Area ?
                          <span className={myclasses.icon_info_about}>
                            <i class="icon ion-information-circled" />
                          </span>
                        </InputLabel>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <i class="icon ion-settings"></i> */}
                      <span className={myclasses.icon_settings}>
                        <i class="icon ion-gear-a" />
                      </span>

                      <InputLabel
                        className={myclasses.label_Editinput}
                        id="demo-controlled-open-select-label"
                      >
                        Edit area Details.
                      </InputLabel>
                    </Grid>
                  </Grid>
                  <TextField
                    className={myclasses.select_opt}
                    select
                    variant="outlined"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    {area_arr.map((data) => {
                      return (
                        <MenuItem key={data.value} value={data.value}>
                          {data.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
              <div className={myclasses.checkbox}>
                <FormControlLabel
                  value="Require approval"
                  control={<Checkbox color="primary" />}
                  label="Require approval"
                  labelPlacement="end"
                />
                <span className={myclasses.icon_info}>
                  <i class="icon ion-information-circled" />
                </span>
              </div>
              <Grid container className={myclasses.checkbox}>
                <Grid item xs={3} className={myclasses.grid}>
                  <div>
                    <InputLabel
                      className={myclasses.label_input}
                      id="demo-controlled-open-select-label"
                    >
                      Start
                    </InputLabel>
                  </div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      placeholder="10:00 AM"
                      variant="outlined"
                      value={begin}
                      onChange={(e) => setBegin(e.target.value)}
                    />
                  </form>
                </Grid>

                <Grid item xs={3} className={myclasses.grid}>
                  <div>
                    <InputLabel
                      className={myclasses.label_input}
                      id="demo-controlled-open-select-label"
                    >
                      Finish
                    </InputLabel>
                  </div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      placeholder="5:15 AM"
                      variant="outlined"
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                    />
                  </form>
                </Grid>

                <Grid item xs={3} className={myclasses.grid}>
                  <div>
                    <InputLabel
                      className={myclasses.label_input}
                      id="demo-controlled-open-select-label"
                    >
                      Meal Break (mins)
                    </InputLabel>
                  </div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      placeholder="0"
                      variant="outlined"
                      value={mbreak}
                      onChange={(e) => setMbreak(e.target.value)}
                    />
                  </form>
                </Grid>

                <Grid item xs={3} className={myclasses.grid}>
                  <div>
                    <InputLabel
                      className={myclasses.label_input}
                      id="demo-controlled-open-select-label"
                    >
                      Rest Break (mins)
                    </InputLabel>
                  </div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      placeholder="0"
                      variant="outlined"
                      value={rbreak}
                      onChange={(e) => setRbreak(e.target.value)}
                    />
                  </form>
                </Grid>
              </Grid>
              <div>
                <InputLabel
                  className={myclasses.label_input}
                  id="demo-controlled-open-select-label"
                >
                  Break Details
                </InputLabel>
              </div>
              <div className={myclasses.checkbox}>
                <Button className={myclasses.addBtn} variant="outlined">
                  Add Break
                </Button>
                <span className={myclasses.iconStatBar}>
                  <i class="icon ion-stats-bars" />
                </span>
              </div>

              <div>
                <InputLabel
                  className={myclasses.label_input}
                  id="demo-controlled-open-select-label"
                >
                  Notes
                </InputLabel>
              </div>
              {/* <div> */}
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={myclasses.textarea}
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note to this shift, the employee will be able to see your notes when they check there shift"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {/* </div> */}
              {/* <Grid container>
                <Grid item xs={6}>
                  <Input
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Input
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Input
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Input
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Input
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Textarea
                    value={title}
                    placeholder='Set Title'
                    onChange={onChangeTitle}
                  />
                </Grid>
              </Grid> */}
            </div>
          </div>
        </CalendarModalBody>
      </Modal>
    </div>
  );
}

// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary
//   }
// }))

// export default function CenteredGrid () {
//   const classes = useStyles()

//   return (
//     <div className={classes.root}>
//       <Grid container>
//         <Grid item xs={4}>
//           <Paper className={classes.paper}>xs=4</Paper>
//         </Grid>
//         <Grid item xs={8}>
//           <Paper className={classes.paper}>xs=8</Paper>
//         </Grid>
//       </Grid>
//     </div>
//   )
// }
