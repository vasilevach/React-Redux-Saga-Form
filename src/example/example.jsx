import * as React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';
import { FormErrorsNotice } from '../common/form';

import { Button, Grid, Paper, Typography, Snackbar } from '@material-ui/core/';
import { UserForm, EducationForm, TaCForm } from '../components';

import '../app.scss';

class FormExample extends React.Component {

  componentDidMount() {
    this.props.getExample()
  }

  render() {
    const { register, submitExample, form } = this.props;

    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          variant="success"
          open={register.showSuccess}
          message={<span id="message-id">You submitted successfully!!!!</span>}
        />
        <Grid className="intro">
          <div>
            <Typography gutterBottom variant="display3" className="primary-heading">
              Please populate our form:
            </Typography>
          </div>
        </Grid>
        {Object.keys(register).length && (
          <div className="main">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper>
                  <Grid container>
                    <Grid item xs={6}>
                      <UserForm formFields={register.userForm} />
                    </Grid>
                    <Grid item xs={6}>
                      {
                        form.userForm && Boolean(form.userForm.hasUniversityEducation.value) ? (
                          <EducationForm formFields={register.educationForm} />
                        ) : (
                          <div style={{ padding: "10px 40px" }}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae urna sed justo eleifend aliquam. Pellentesque ac arcu a sapien viverra condimentum et a sem. Curabitur vehicula lorem et nulla blandit</p>
                            <p> Id venenatis odio sodales. Aliquam dapibus ligula nisi, ut consectetur ipsum ullamcorper eget. Sed viverra tincidunt sodales. Nullam quam magna, auctor id ex sed, pharetra commodo neque. Praesent nulla quam, aliquam at dolor eget, tristique placerat magna. Nullam ornare ultrices sem eget feugiat. </p>
                          </div>
                        )
                      }
                    </Grid>
                  </Grid>
                  <div style={{ padding: '40px 10px', textAlign: 'center' }}>
                    <TaCForm formFields={register.termsAndConditions} />
                    <FormErrorsNotice />
                    <Button variant="contained" color="primary" onClick={submitExample}>
                      Send
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  register: state.register,
  form: state.form
});

export default connect(mapStateToProps, Actions)(FormExample);