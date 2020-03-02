import React, { Component } from 'react';

import Company from '../Company/Company';
import CompanyJSON from './../../company.json';
import axios from 'axios';

import BottomScrollListener from 'react-bottom-scroll-listener'

export default class Companies extends Component {
  constructor(props) {
    console.log(CompanyJSON);
    
    super(props)
    this.state = {
      hits: [],
      offsetHits: 20
    }
  }

  getCompanies(offset) {
    axios.get('/api/company/_search?offset=' + offset)
      .then((response) => {
      })
      .catch((error) => {
        this.setState({
          hits: [
            ...this.state.hits,
            ...CompanyJSON.hits.hits.slice(offset - 20, offset)
          ]
        })
      })
  }

  componentDidMount() {
    this.getCompanies(this.state.offsetHits)
  }

  onBottom() {
    this.setState({
      offsetHits: this.state.offsetHits + 20
    }, () => {
      console.log(this.state.offsetHits);

      this.getCompanies(this.state.offsetHits)
    });
  }

  onOpen(id) {
    const hits = this.state.hits.map(hit => {
      if (hit._id === id) {
        return {
          ...hit,
          isOpen: !hit.isOpen
        }
      }
      return hit
    })

    this.setState({
      hits
    })
  }

  render() {
    return (
      <div>
        {this.state.hits.map((data, key) =>
          <Company
            {...this.props}
            key={key}
            data={data}
            isOpen={!!data.isOpen}
            onOpen={id => this.onOpen(id)}
          />
        )}
        <BottomScrollListener onBottom={() => this.onBottom()} />
      </div>
    )
  }
}
