const inquirer   = require('inquirer');
const files      = require('./files');

module.exports = {

  askProjectDetails: () => {
    const questions = [
      {
        name: 'projectName',
        type: 'input',
        message: 'Enter the name of the project:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name.';
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter the description:'
      }
    ];
    return inquirer.prompt(questions);
  },
}