import React, { Component } from 'react';
import axios from "axios";
import Repositories from './repositories';

class  InfinitScroll extends Component{

    constructor(){
      super();
      this.state={
        repos:[],
        loading: false,
        page: 1,
        prevY: 0 ,
        error: false 
    }
  }

  componentDidMount() {
    this.getRepos(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }
  handleObserver(entities) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      this.getRepos(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }
  getRepos(page) {
    this.setState({ loading: true });
    let d = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:>${d.toISOString()}&sort=stars&order=desc&page=${page}`
      )
      .then(res => {
        this.setState({ repos: [...this.state.repos, ...res.data.items] });
        this.setState({ loading: false });
      }).catch(error=>{
        this.setState({ error: true });
      });
  }
    render() {
      return (<>
       <Repositories repos={this.state.repos}/>
     
       <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          sltyle={{ height: "100px", margin: "30px"}}
        >
       {this.state.error ? 
       <span>No more data to Load</span> :
        <span style={{ display: this.state.loading ? "block" : "none" }}>
          Loading...</span>}
        </div>
      </>
      );
    }
   }
  
  
  export default InfinitScroll;
  