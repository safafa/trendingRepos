import React, { Component } from 'react';
import axios from "axios";
import Repositories from './repositories';
class  InfinitScroll extends Component{

    constructor(){
      super();
      this.state={
        repos:[],
    }
  }
  componentDidMount() {
    this.getRepos(this.state.page);
  }
  getRepos(page) {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:>2021-01-07&sort=stars&order=desc&page=${page}`
      )
      .then(res => {
        this.setState({ repos: [...this.state.repos, ...res.data.items] });
        this.setState({ loading: false });
      });
  }
    render() {
      
      return (
       <Repositories repos={this.state.repos}/>
      );
    }
   }
  
  
  export default InfinitScroll;
  