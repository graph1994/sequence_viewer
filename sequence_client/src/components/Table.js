import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { actions, getSequences } from '../reducers/sequence'
import { sequenceColor, renderDate } from '../utils'
import { Link } from 'react-router-dom'
import SequenceModal from './SequenceModal'
const {
  startFetchSequences,
} = actions

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
  { id: 'sequence', numeric: true, disablePadding: false, label: 'Sequence' },
  { id: 'created_at', numeric: true, disablePadding: false, label: 'Creation Date' },
];

class SequenceTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                align={'left'}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

SequenceTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

class SequenceTable extends Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    searchQuery: '',
  };

  static propTypes = {
    startFetchSequences: PropTypes.func.isRequired,
    sequenceData: PropTypes.array.isRequired,
  }

  static deafultProps = {
    sequenceData: [],
  }


  componentDidMount() {
    this.props.startFetchSequences({})
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'asc';

    if (this.state.orderBy === property && this.state.order === 'asc') {
      order = 'desc';
    }

    this.setState({ order, orderBy });
  };

  filterSequences = (sequences) => {
    if(sequences.length > 0 ) {
      return sequences.filter(obj => obj.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1);
    }
    return sequences
  };

  Menu = (
    <Toolbar>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <TextField
            id="outlined-search"
            label="Search by Name"
            type="search"
            margin="dense"
            variant="outlined"
            onChange={e => this.setState({ searchQuery: e.target.value })}
          />
        </Grid>
        <Grid item>
          <Link to='/add' style={{textDecoration: 'None'}}>
            <Button variant="outlined" color="primary">
                <Icon>add_circle</Icon> Add
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  );

  render() {
    const { sequenceData } = this.props;
    const { order, orderBy } = this.state;

    return (
      <Paper>
        {this.Menu}
        <div >
          <Table>
            <SequenceTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {this.filterSequences(stableSort(sequenceData, getSorting(order, orderBy))).map(n => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell>
                        <SequenceModal {...n} key={n.id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="left">{n.description}</TableCell>
                      <TableCell align="left">
                        <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px"}} id={n.id}>
                          {sequenceColor(n.sequence)}
                        </div>
                      </TableCell>
                      <TableCell align="left">{renderDate(n.created_at)}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

export const mapStateToProps = (state, props) => {
  return {
    sequenceData: getSequences(state) || [],
  }
}

export default connect(mapStateToProps, {
  startFetchSequences,
})(SequenceTable)