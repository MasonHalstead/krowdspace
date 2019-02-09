import React, { Component } from 'react';
import PasswordReset from '../modals/PasswordReset';
class ProfileWrapper extends Component {
  render() {
    return (
    <React.Fragment>
    <div className="hub-wrapper">
        <h1>Krowdspace</h1>
        <p>
        At Krowdspace, our goal is to unify the crowdfunding community.
        Krowdspace members will receive exclusive rewards for backing
        projects and project owners gain access to our easy to use
        promotional tools and resources to take their campaigns to the next
        level.
        </p>
    </div>
    <PasswordReset />
    </React.Fragment>
    );
  }
}
export default ProfileWrapper;
