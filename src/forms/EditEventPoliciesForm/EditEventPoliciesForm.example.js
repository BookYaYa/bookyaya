/* eslint-disable no-console */
import EditListingPoliciesForm from './EditEventPoliciesForm';

export const Empty = {
  component: EditEventPoliciesForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditEventPoliciesForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
