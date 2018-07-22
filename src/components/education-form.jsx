import * as React from 'react';
import { FormWrapper } from '../common/form';
import { createCustomFieldConfiguration } from '../common/form/utils';
import { TextField, FormControl, FormHelperText, Select, MenuItem } from '@material-ui/core/';

import './form.scss';

const CUSTOM_CONFIG = {
  type: 'multiline',
  name: 'courses',
  label: 'What courses did you take?',
  validations: ['required'],
  value: 'Computer Science'
};

class EducationForm extends React.Component {
  render() {
    const { formFields } = this.props;

    return (
      <React.Fragment>
        <div style={{ padding: '10px 40px' }}>
          <h3>Education Form</h3>
          <div className="vertical-form">
            <FormWrapper
              formName="educationForm" // We specify the name of the form that will saved as a key in the Redux store
              fields={formFields}
              renderChildren={( fields, onChange, getState, getError ) => {
                return (
                  Object.keys(formFields).map((f) => {
                    switch(formFields[f].type) {
                      case 'selection':
                        return (
                          <FormControl
                            style={{ display: 'flex' }}
                            error={getState(formFields[f].name) === 'error' ? true : false}
                            key={formFields[f].name}
                          >
                            <Select
                              value={fields[formFields[f].name].value}
                              onChange={(e) => onChange(formFields[f].name, e.target.value)}
                              inputProps={{
                                name: formFields[f].name,
                                id: formFields[f].name,
                              }}
                            >
                              {formFields[f].options.map((option) => (
                                <MenuItem value={option} key={option}>{option}</MenuItem>
                              ))}
                            </Select>
                            {Boolean(getError(formFields[f].name)) && (
                              <FormHelperText><span>{getError(formFields[f].name)}</span></FormHelperText>
                            )}
                          </FormControl>
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
                            style={{ display: 'flex' }}
                          />
                        );
                    }
                  })
                )
              }}
            />
          </div>
        </div>
        <div style={{ padding: '10px 40px' }}>
          <h3>Custom Form</h3>
          <div className="vertical-form">
            <FormWrapper
              formName="customEducationForm" // We specify the name of the form that will saved as a key in the Redux store
              fields={createCustomFieldConfiguration([CUSTOM_CONFIG])}
              renderChildren={( fields, onChange, getState, getError ) => {
                return (
                  <FormControl
                    error={getState(CUSTOM_CONFIG.name) === 'error' ? true : false}
                    style={{ display: 'flex' }}>
                    <TextField
                      id={CUSTOM_CONFIG.name}
                      label={CUSTOM_CONFIG.label}
                      multiline
                      rowsMax="4"
                      value={fields[CUSTOM_CONFIG.name].value}
                      onChange={(e) => onChange(CUSTOM_CONFIG.name, e.target.value)}
                      margin="normal"
                    />
                    {Boolean(getError(CUSTOM_CONFIG.name)) && (
                      <FormHelperText><span>{getError(CUSTOM_CONFIG.name)}</span></FormHelperText>
                    )}
                  </FormControl>
                )
              }}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default EducationForm;