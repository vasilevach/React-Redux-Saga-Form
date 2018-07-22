import * as React from 'react';
import { connect } from 'react-redux';
import { hasAtLeastOneErrorInState } from './utils';

import { List, ListItem, ListItemText } from '@material-ui/core/';

class FormErrorsNotice extends React.Component {

  buildNeededFormsObject = () => {
    const { formNames, forms } = this.props;
    return formNames.reduce((picked, name) => ({ ...picked, [name]: forms[name] }), {});
  }

  getAllCurrentErrors = () => {
    const { formNames, forms } = this.props;
    const errorsObject = formNames && formNames.length ? this.buildNeededFormsObject() : forms;

    return [].concat.apply([], Object.values(errorsObject).map((form) => (
      Object.values(form).filter((item) => item.activeErrorState.hasError && item.isTouched))
    ).filter((item) => item.length));
  }

  render() {
    const { dispatch, forms, formNames, showAggregatedErrorsCount, ...rest } = this.props;

    if (hasAtLeastOneErrorInState(forms) && Boolean(showAggregatedErrorsCount)) {
      return (
        <div id="forms-notice" scrollCount={showAggregatedErrorsCount} {...rest}>

          <List dense={false}>
            {this.getAllCurrentErrors().map((error, k) => (
              <ListItem>
                <ListItemText
                  style={{ textAlign: 'center', color: 'red' }}
                  key={k}
                  primary={`${error.label}: ${error.activeErrorState.message}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  forms: state.form,
  showAggregatedErrorsCount: state.form.showAggregatedErrorsCount
});

export default connect(mapStateToProps)(FormErrorsNotice);
