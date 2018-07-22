import * as React from 'react';
import { FormWrapper } from '../common/form';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core/';

import './form.scss';

class UserForm extends React.Component {
  render() {
    const { formFields } = this.props;

    return (
      <div style={{ padding: '10px 40px' }}>
        <h3>User Form</h3>
        <div className="basic-form">
          <FormWrapper
            formName="userForm" // We specify the name of the form that will saved as a key in the Redux store
            fields={formFields}
            renderChildren={( fields, onChange, getState, getError ) => {
              return (
                Object.keys(formFields).map((f) => {
                  switch(formFields[f].type) {
                    case 'checkbox':
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fields[formFields[f].name].value}
                              onChange={(e) => {
                                onChange(formFields[f].name, e.target.checked)
                              }}
                            />
                          }
                          label={formFields[f].label}
                          key={formFields[f].name}
                        />
                      );
                    default:
                      return (
                        <TextField
                          // This can come from configuration
                          type={formFields[f].type}
                          id={formFields[f].name}
                          label={formFields[f].label}

                          // This must come from redux store
                          value={fields[formFields[f].name].value}

                          // This must come from FormWrapper
                          onChange={(e) => onChange(formFields[f].name, e.target.value)}
                          // Validation notifications, must come from FormWrapper
                          error={getState(formFields[f].name) === 'error' ? true : false}
                          helperText={Boolean(getError(formFields[f].name)) ? getError(formFields[f].name) : null }

                          // custom configurations:
                          margin="normal"
                          autoComplete={formFields[f].type === 'password' ? "new-password" : null}
                          key={formFields[f].name}
                        />
                      );
                  }
                })
              )
            }}
          />
        </div>
      </div>
    )
  }
}

export default UserForm;