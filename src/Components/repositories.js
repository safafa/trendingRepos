import React from 'react';
import { Media, Badge} from 'reactstrap';

function RenderRepo({repo}) {
    return( 
        <Media className="mb-5">
        <Media className="mr-5" >
          <Media src={repo.owner.avatar_url} alt="owner's image" style={{maxHeight: 128, maxWidth: 128}} />
        </Media>
        <Media body >
          <Media heading>
            {repo.name}
          </Media>
          <p>{repo.description}</p>
          <p><Badge outline color="secondary">Stars: {repo.stargazers_count} </Badge>  <Badge color="secondary">Issues: {repo.open_issues_count}  </Badge> submitted{" "}
              {Math.trunc(
                (new Date().getTime() - new Date(repo.updated_at).getTime()) /
                  (1000 * 3600 * 24)
              )}{" "}
              days ago by {repo.owner.login}  </p>        
        </Media>
      </Media>
      )
}
    
    


function Repositories(props) {
    const repos = props.repos.map((repo) => {
        return (
            <RenderRepo repo={repo}/>
        );
    });
    

    return(
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                    <hr/>
                </div>
                <div className="col-12">
                    <Media list>
                        {repos}
                    </Media>
                </div>
            </div>
               
       </div>
    );
}

export default Repositories;