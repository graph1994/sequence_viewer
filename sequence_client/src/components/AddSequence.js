import React, { Component } from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { actions } from '../reducers/sequence';
const { createSequence } = actions

class AddSequence extends Component {
  state = {
    name: '',
    description: '',
    sequence: '',
    valid: false,
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSave = () => {
    this.props.createSequence(this.state)
    this.props.history.push("/")
  };

  hasSequenceError = () => {
    if(this.state.sequence.length) {
      return !new RegExp("^[TCGA]+$").test(this.state.sequence)
    } else {
      return false
    }
  }


  render() {
    return (
      <Card>
        <CardContent>
        <Typography variant="h5" component="h2">
        Add a DNA Sequence
        </Typography>
        <FormControl required error={this.state.valid} component="fieldset">
          <FormGroup>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={24}
            >
              <Grid item style={{width: '500px'}} >
                  <FormControlLabel
                    control={
                      <TextField
                        style={{width: '235px'}}
                        id="outlined-adornment-weight"
                        variant="outlined"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                      />
                    }
                  />
                  <FormControlLabel
                    control={
                      <TextField
                        style={{width: '225px'}}
                        id="outlined-adornment-weight"
                        variant="outlined"
                        label="Description"
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                      />
                    }
                  />
              </Grid>
              <Grid item style={{width: '500px'}}>
                 <div style={{marginBottom: '10px'}}>{this.hasSequenceError() ? <FormHelperText>Invalid Characters in Sequence, Please use A,C,T, or G.</FormHelperText>: null} </div>

                      <TextField
                        error={this.hasSequenceError()}
                        id="outlined-adornment-weight"
                        multiline
                        variant="outlined"
                        label="Sequence"
                        rows="8"
                        fullWidth={true}
                        value={this.state.sequence}
                        onChange={this.handleChange('sequence')}
                      />
                </Grid>
          </Grid>
          </FormGroup>

        </FormControl>

          <Button variant="contained" color="primary"  onClick={this.handleSave} disabled={this.hasSequenceError()}> Save</Button>
          </CardContent>
      </Card>
    )
  }
}

export const mapStateToProps = (state, props) => {
  return {
    classes: {},
    createSequence: createSequence,
  }
}

export default connect(mapStateToProps, {
  createSequence,
})(AddSequence)