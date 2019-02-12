import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleModal, setAuthToken, setLoading } from 'actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isUrl from 'is-url';

import { ChooseSource } from '../fragments/ChooseSource';
import { ChooseCategories } from '../fragments/ChooseCategories';
import { ChooseProject } from '../fragments/ChooseProject';

import Modal from 'react-bootstrap/Modal';

import krowdspace from '../../resources/images/krowdspace-logo.svg';
import { api } from '../../resources/js/krowdspace.api';
import { core } from '../../resources/js/krowdspace.core';

const mapStateToProps = state => {
  return {
    modals: state.modals,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => dispatch(toggleModal(modal)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setLoading: setting => dispatch(setLoading(setting))
  };
};
const initial_state = {
  domain: '',
  categories: [],
  url: '',
  url_valid: 0,
  agree: false,
  toggle: 0,
  valid: false
};
class ConnectedSubmitProject extends Component {
  state = {
    domain: '',
    categories: [],
    url: '',
    url_valid: 0,
    agree: false,
    toggle: 0,
    valid: false
  };
  handleOnBack = () => {
    this.setState({
      categories: [],
      url: '',
      toggle: this.state.toggle-1,
      valid: false,
      agree: false
    });
  }
  handleCheckCategory = id => {
    const { categories } = this.state;
    if(categories.includes(id)){
      const index = categories.indexOf(id);
      categories.splice(index, 1);
    }else{
      categories.push(id)
    }
    this.setState({categories: categories})
  }
  handleOnSelect = domain => this.setState({ 
    domain: domain, 
    toggle: this.state.toggle+1
  });
  handleCloseModal = () => this.props.toggleModal({ submit_project: false });
  handleValidation = () =>
    this.setState(
      {
        agree: !this.state.agree,
        valid: false
      },
      () => this.isValidForm()
    );
  handleOnInput = e => {
    this.setState(
      {
        [e.target.name]: e.target.value.trim().toLowerCase(),
        valid: false
      },
      () => this.isValidForm()
    );
  };
  isValidForm = () => {
    const { agree, url, domain } = this.state;
    let url_valid = 0;
    const regex = new RegExp(`${domain}.com/`);

    if (regex.test(url)) url_valid++;
    if(isUrl(url)) url_valid++;
    
    this.setState({ url_valid: url_valid });

    if (agree && url && url_valid === 2) {
      this.setState({ valid: true });
    }
  };
  chooseToggleScreen = (toggle) => this.setState({...toggle})
  toggleSwitch = (screen) => {
    const { categories, domain, url_valid, url, agree, valid } = this.state;
    switch(screen) {
      case 0:
        return <ChooseSource handleOnSelect={this.handleOnSelect}/>;
      case 1:
        return <ChooseCategories domain={domain} categories={categories} handleCheckCategory={this.handleCheckCategory} chooseToggleScreen={this.chooseToggleScreen}/>;
      case 2:
        return <ChooseProject url_valid={url_valid} url={url} domain={domain} agree={agree} valid={valid} handleOnInput={this.handleOnInput} handleValidation={this.handleValidation} handleSubmit={this.handleSubmit}/>;
      default:
        return null
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { domain, url,categories } = this.state;
    const { setLoading, toggleModal, user } = this.props;

    // Show loading icon
    setLoading(true);

    const data = {
      url,
      domain,
      categories
    };

    //Pass data to the public API route
    api.postData('/api/projects/create', data, user.token).then((res) => {

      // Set initial state and handle response
      this.setState({...initial_state, categories: []}, () => {
        toggleModal({ submit_project: false });
        setLoading(false);
      });
    })
    .catch((err) => {
      // Set initial state and handle response
      this.setState({...initial_state, categories: []}, () => {
        toggleModal({ submit_project: false });
        core.handleError(err)
      })
    })
  };
  render() {
    const { toggle } = this.state;
    const { modals } = this.props;
    return (
      <Modal
        className="user-create-modal"
        show={modals.submit_project}
        onHide={this.handleCloseModal}
      >
        { toggle !== 0 && <FontAwesomeIcon
          onClick={() => this.handleOnBack()}
          className="modal-back-icon"
          icon={['fas', 'long-arrow-alt-left']}
          size="lg"
        /> }
        <FontAwesomeIcon
          onClick={this.handleCloseModal}
          className="modal-close-icon"
          icon={['fas', 'times']}
          size="sm"
        />
        <div className="user-login-header">
          <img
            className="logo-image"
            src={krowdspace}
            alt="Krowdspace Logo"
            height={34}
          />
        </div>
        <div className="user-create-body">
          {this.toggleSwitch(toggle)}
        </div>
      </Modal>
    );
  }
}

const SubmitProject = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSubmitProject);
const SubmitProjectWithRouter = withRouter(SubmitProject);
export default SubmitProjectWithRouter;
