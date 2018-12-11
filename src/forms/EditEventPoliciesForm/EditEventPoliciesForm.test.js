// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditEventPoliciesFormComponent } from './EditEventPoliciesForm';

const noop = () => null;

describe('EditEventPoliciesForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditEventPoliciesFormComponent
        publicData={{}}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save rules"
        updated={false}
        updateInProgress={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
