const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

// Callback function to handle input changes using event delegation
const onFeedbackFormFieldInput = ({ target: formFieldEl }) => {
  const formFieldName = formFieldEl.name;

  const formFieldValue = formFieldEl.value.trim();

  formData[formFieldName] = formFieldValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Function to check localStorage and populate the form on page load
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    refs.feedbackForm.elements.email.value = formData.email;
    refs.feedbackForm.elements.message.value = formData.message;
  }
}
// Callback function to handle form submission (submit event)
const onFeedbackFormSubmit = event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted Data', formData);
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  refs.feedbackForm.reset();
};
populateForm();
//  Register event listeners on the form element
refs.feedbackForm.addEventListener('input', onFeedbackFormFieldInput);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
