import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as filterActions from '../actions/filterActions';

import { Button, Container, Grid, Header, Icon,Image, Input, Label, Rating, Segment, Select } from 'semantic-ui-react'

import './Results.css';

class Results extends React.Component {

  constructor(props) {
    super(props);

    this.loadMoreClick= this.loadMoreClick.bind(this);
    this.handleFilterByName= this.handleFilterByName.bind(this);
    this.handleFilterByStars= this.handleFilterByStars.bind(this);
    this.handleFilterByBudget= this.handleFilterByBudget.bind(this);
    this.handleSortBy= this.handleSortBy.bind(this);

    this.state = { 
      elementToShow: 20,
      stars: 0
    }; 
  }

  handleFilterByName(e, { value }) {
    let { results, filter } = this.props;
    
    filter.Name = value;

    this.props.filterActions.changeNameFilter(value);
    this.props.filterActions.filterResults(results, filter);
  }

  handleFilterByStars(e, value) {
    let { results, filter } = this.props;

    filter.Stars = value.rating;

    this.props.filterActions.changeStarsFilter(value.rating);
    this.props.filterActions.filterResults(results, filter);
  }

  handleFilterByBudget(e, { value }) {
    let { results, filter } = this.props;

    filter.Budget = value;

    this.props.filterActions.changeBudgetFilter(value);
    this.props.filterActions.filterResults(results, filter);
  }

  handleSortBy(e, { value }) {
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

    const sortingOptions = [
        { key: 1, text: 'Distance', value: 'Distance' },
        { key: 2, text: 'MinCost', value: 'MinCost' },
        { key: 3, text: 'Stars', value: 'Stars' },
        { key: 4, text: 'UserRating', value: 'UserRating' }
    ];

    if (filtered.length > 0) {
      listItems = filtered.slice(0, currentState.elementToShow).map((result, i) =>
        <Grid.Row key={i}>
            <Grid.Column mobile={16} computer={3}>
                <Image src={result.ImageUrl} />
            </Grid.Column>
            <Grid.Column mobile={16} computer={13} textAlign="left">
                <Header size='medium'>{result.Name} - <Rating icon='star' defaultRating={result.Stars} disabled maxRating={5} />
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
      noResults = <div>No result to show</div>
    }
      
    return (
      <Container>
        <Segment basic padded>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} computer={4}>
                        <Segment basic>
                            <Input placeholder="Filter by name ..." onChange={this.handleFilterByName} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={4} verticalAlign="middle">
                        <Rating maxRating={5} defaultRating={0} icon='star' size='huge' onRate={this.handleFilterByStars} title="Set minimum stars"/>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={4}>
                        <Segment basic>
                            <Input label={{ basic: true, content: '£' }} labelPosition='right' placeholder='Set your badget ...'  onChange={this.handleFilterByBudget} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={4}>
                        <Segment basic>
                            <Select mobile={16} computer={4} placeholder='Sort by' options={sortingOptions} onChange={this.handleSortBy}/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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
