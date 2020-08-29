import React from "react";
import UserCard from "../UserCard/index";

import "./style.css";

class UserGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      currentPage: 0
    };
  }

  //  lifecycle method of React which is called for only once after the first render method is called
  componentDidMount = () => {
    //  fetching users when the page loads
    this.fetchUsers();
  };

  fetchUsers = () => {
    //  setting which page to fetch
    const pageToFetch = this.state.currentPage + 1;

    //  url from which data should be fetched
    const url = `https://reqres.in/api/users?page=${pageToFetch}`;

    //  updating the loading status to true to show loading
    this.setLoading(true);

    //  starting to fetch data
    fetch(url, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        //  copying the old users along with the new users
        const prevUsers = [...this.state.users, ...result.data];

        //  updating the user list and currentPage
        this.setState({
          users: prevUsers,
          currentPage: pageToFetch
        });

        //  updating the loading status to false to hide loading
        this.setLoading(false);
      })
      .catch((error) => {
        //  updating the loading status to false to hide loading
        this.setLoading(false);
      });
  };

  setLoading = (status) => {
    this.setState({
      isLoading: status
    });
  };

  render = () => {
    return (
      <div className="container">
        <p className="title">------ User Gallery--------</p>

        <div className="show-area">
          {this.state.users.map((user) => {
            return (
              <UserCard
                key={user.id}
                picUrl={user.avatar}
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
              />
            );
          })}
        </div>
        {this.state.isLoading ? (
          <span className="loading-text">Loading ...</span>
        ) : (
          <button className="load-btn" onClick={this.fetchUsers}>
            Load More
          </button>
        )}
      </div>
    );
  };
}

export default UserGallery;
