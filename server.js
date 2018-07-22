const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const userForm = {
  firstName: {
    type: 'text',
    readonly: false,
    name: 'firstName',
    label: 'First Name',
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      },
      {
        name: 'regex',
        value: '^([a-zA-Z])',
        error: 'Your name looks very strange, you sure your mom named you like that?'
      }
    ]
  },
  lastName: {
    type: 'text',
    readonly: false,
    name: 'lastName',
    label: 'Last Name',
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      },
      {
        name: 'regex',
        value: '^([a-zA-Z])',
        error: 'Your name looks very strange, you sure your mom named you like that?'
      }
    ]
  },
  username: {
    type: 'text',
    readonly: false,
    name: 'username',
    label: 'Username',
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      },
      {
        name: 'regex',
        value: '^([a-z0-9]{1,32})',
        error: 'Invalid username'
      }
    ]
  },
  password: {
    type: 'password',
    readonly: false,
    name: 'password',
    label: 'Password',
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      },
      {
        name: 'regex',
        value: '^(.*).{8,}$',
        error: 'Password too short'
      }
    ]
  },
  email: {
    type: 'text',
    readonly: false,
    name: 'email',
    label: 'Email',
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      },
      {
        name: 'regex',
        value: '^[a-z0-9A-Z\\.\\+_\\-]+@[a-z0-9A-Z\\.\\-]+\\.[a-z0-9A-Z\\.\\+_\\-]+$',
        error: 'Invalid email'
      }
    ]
  },
  hasUniversityEducation: {
    type: 'checkbox',
    readonly: false,
    value: false,
    name: 'hasUniversityEducation',
    label: 'Have you enrolled in university?',
    validations: []
  }
};

const educationForm = {
  university: {
    type: 'selection',
    readonly: false,
    name: 'university',
    label: 'University',
    options: [
      'AUBG',
      'Sofia University',
      'Technical University',
      'UNSS',
      'New Bulgarian'
    ],
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      }
    ]
  },
  universityCity: {
    type: 'text',
    readonly: false,
    name: 'universityCity',
    label: 'University City',
    validations: [
      {
        name: 'regex',
        value: '^\w+$',
        error: 'This field does not seem right'
      }
    ]
  },
  universityStreet: {
    type: 'text',
    readonly: false,
    name: 'universityStreet',
    label: 'University Street',
    validations: [
      {
        name: 'regex',
        value: '^\w+$',
        error: 'This field does not seem right'
      }
    ]
  }
};

const termsAndConditions = {
  tac: {
    type: 'checkbox',
    readonly: false,
    value: false,
    name: 'tac',
    label: 'Terms and conditions',
    validations: [
      {
        name: 'required',
        error: 'This field should not be left empty'
      }
    ]
  }
}


app.get('/example', function (req, res) {
  return res.json({
    userForm,
    educationForm,
    termsAndConditions
  });
});

app.post('/example/post', function (req, res) {
  const payload = req.body;


  if (payload.email.split('@')[1] !== 'edu.com') {
    res.status(500).json({
      "type": "/validation-error",
      "title": "Invalid request",
      "validationErrors": {
        userForm : {
          email : "Your email should be @edu.com"
        }
      }
    });
  } else {
    res.status(200).json({
      "type": "success",
      "title": "All is ok!"
    });
  }
});

const port = process.env.PORT || 9999;
app.listen(port, () => console.log('Server start at port: ' + port));
