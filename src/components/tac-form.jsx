import * as React from 'react';
import { FormWrapper } from '../common/form';
import { Checkbox, FormControlLabel, FormHelperText } from '@material-ui/core/';

import './form.scss';

class TaCForm extends React.Component {
  render() {
    const { formFields } = this.props;

    return (
      <div style={{ padding: '10px 40px' }}>
        <FormWrapper
          formName="tacForm" // We specify the name of the form that will saved as a key in the Redux store
          fields={formFields}
          renderChildren={( fields, onChange, getState, getError ) => {
            return (
              <React.Fragment>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fields[formFields.tac.name].value}
                      onChange={(e) => {
                        onChange(formFields.tac.name, e.target.checked)
                      }}
                    />
                  }
                  label={formFields.tac.label}
                  key={formFields.tac.name}
                />
                {Boolean(getError(formFields.tac.name)) && (
                  <FormHelperText style={{ textAlign: 'center', color: 'red' }}><span>{getError(formFields.tac.name)}</span></FormHelperText>
                )}
              </React.Fragment>
            )
          }}
        />
      </div>
    )
  }
}

export default TaCForm;