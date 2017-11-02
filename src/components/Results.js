import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as filterActions from '../actions/filterActions';

import { Button, Container, Dropdown, Menu, Grid, Header, Icon,Image, Input, Label, Rating, Segment } from 'semantic-ui-react'

import './Results.css';

class Results extends React.Component {

  constructor(props) {
    super(props);

    this.loadMoreClick= this.loadMoreClick.bind(this);
    this.handleFilterByName= this.handleFilterByName.bind(this);
    this.handleSortBy= this.handleSortBy.bind(this);

    this.state = { 
      elementToShow: 20
    }; 
  }

  handleFilterByName(e, { value }) {
    let { results, filter } = this.props;

    filter.Name = value;

    this.props.filterActions.changeNameFilter(value);
    this.props.filterActions.filterResults(results, filter);
  }

  handleSortBy(e, { value }) {
    debugger;
    let { results, filter } = this.props;

    filter.SortBy = value;

    this.props.filterActions.changeSortBy(value);
    this.props.filterActions.filterResults(results, filter);
  }

  loadMoreClick() {
    const currentState = this.state;
    this.setState({
      elementToShow: currentState.elementToShow + 20
    });
  }

  render() {
    const currentState = this.state; 
    let { filtered } = this.props;

    let listItems = null;
    let loadMore = null;
    let noResults = null;
    let filterItems = null;
    let sortingItem = null;

    const sortingOptions = [
        { key: 1, text: 'Distance', value: 'Distance' },
        { key: 2, text: 'MinCost', value: 'MinCost' },
        { key: 3, text: 'Stars', value: 'Stars' },
        { key: 4, text: 'UserRating', value: 'UserRating' }
    ];

    filterItems = <Input placeholder="Filter by name..." onChange={this.handleFilterByName} />
    sortingItem = <Menu compact>
                    <Dropdown text="Sort by" options={sortingOptions} onChange={this.handleSortBy} simple item />
                   </Menu>;

    if (filtered.length > 0) {
      listItems = filtered.slice(0, currentState.elementToShow).map((result, i) =>
        <Grid.Row key={i}>
            <Grid.Column width={3}>
                <Image src={result.ImageUrl} />
            </Grid.Column>
            <Grid.Column width={13} textAlign="left">
                <Header size='medium'>{result.Name} - <Rating icon='star' defaultRating={result.Stars} maxRating={5} />
                    <Header.Subheader>{result.Location}</Header.Subheader>
                </Header>
                <Label><Icon name='user' />{result.UserRating + " (" + result.UserRatingCount + ")"}</Label>
                <Header size='medium'>£{result.MinCost}</Header>
                <Button floated="right" primary>Book now</Button>
            </Grid.Column>
        </Grid.Row>
      );
      loadMore = <Button primary onClick={this.loadMoreClick}>Load more</Button>;
    }
    else {
      noResults = <div className="no-results">No result to show</div>
    }
      
    return (
      <Container>
        <Segment basic padded>
            {filterItems} - {sortingItem}
        </Segment>
        {noResults}
        <Grid celled>
          {listItems}
        </Grid>
        <Segment basic padded>
            {loadMore}
        </Segment>
      </Container>
    );
  }
}

Results.propTypes = {
  filterActions: PropTypes.object,
  filter: PropTypes.object,
  filtered: PropTypes.array,
  results: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    filter: state.filter,
    filtered: state.filtered,
    results: state.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterActions: bindActionCreators(filterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
