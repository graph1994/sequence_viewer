import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import { sequenceColor } from '../utils'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '1000px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class SequenceModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, name, sequence, description } = this.props;
    return (
      <div>
        <Icon onClick={this.handleOpen}>zoom_info</Icon>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
           <div>Name: {name} </div>
           <div>Description: {description}</div>
           <div styles={{ wordWarp: 'break-word'}}>
             Sequence:
             {sequenceColor(sequence)}
           </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const SimpleModalWrapped = withStyles(styles)(SequenceModal);

export default SimpleModalWrapped;