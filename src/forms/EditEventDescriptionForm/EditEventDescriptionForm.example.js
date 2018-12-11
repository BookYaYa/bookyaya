/* eslint-disable no-console */
import EditEventDescriptionForm from './EditEventDescriptionForm';

export const Empty = {
  component: EditEventDescriptionForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditEventDescriptionForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
