import * as React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';

class FormWrapper extends React.Component {

  getState = (fieldName) => {
    const { form, formName } = this.props;
    if (!form[formName]) {
      return null;
    }

    const field = form[formName][fieldName];

    // we will get the state only if the field has been touched!
    if (field.isTouched && field.activeErrorState.hasError) {
      return 'error';
    }

    if (field.isTouched && !field.activeErrorState.hasError) {
      return 'success';
    }

    return null;
  }

  getError = (fieldName) => {
    const { form, formName } = this.props;

    if (!form[formName]) {
      return null;
    }

    const field = form[formName][fieldName];

    // we will get the error message only if the field has been touched!
    if (field.isTouched && field.activeErrorState.hasError) {
      return field.activeErrorState.message;
    }

    return null;
  }

  onChangeFormField = (fieldName, value) => {
    const { formName, changeFormField } = this.props;

    changeFormField(formName, fieldName, value);
  }

  componentDidMount() {
    this.props.initForm(this.props.formName, this.props.fields);
  }

  componentDidUpdate(prevProps) {;
    if (JSON.stringify(prevProps.fields) === JSON.stringify(this.props.fields)) {
      return;
    }

    this.props.initForm(this.props.formName, this.props.fields);
  }

  componentWillUnmount() {
    this.props.destroyForm(this.props.formName);
  }

  render() {
    const { form, formName } = this.props;
    if (!form[formName]) {
      return null;
    }

    return this.props.renderChildren(
      form[formName],
      this.onChangeFormField,
      this.getState,
      this.getError
    );
  }
}

const mapStoreToProps = (state) => ({
  form: state.form
});

export default connect(mapStoreToProps, Actions)(FormWrapper);
