import React, { Component } from 'react';
import axios from "axios";
import {Spinner} from "reactstrap";
import Repositories from './repositories';

class  InfinitScroll extends Component{

    constructor(){
      super();
      this.state={
        repos:[],
        loading: false,
        page: 1,
        prevY: 0 ,
        errorMessage:''
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
        this.setState({ repos: [...this.state.repos, ...res.data.items], errorMessage:''});
        
      }).catch(error=>{
        this.setState({ errorMessage: error.message, loading:false });
      });
  }
  
    render() {
      return (<>
       <Repositories repos={this.state.repos}/>
       <p>{this.state.repos.length} repository</p>
     
       <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
        >
        <Spinner style={{ display: this.state.loading  ? "block" : "none", width: '3rem', height: '3rem'  }}  />
         {this.state.errorMessage && <span> {this.state.errorMessage} </span>} 
        </div>
      </>
      );
    }
   }
  
  
  export default InfinitScroll;
  