import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import EditEventDescriptionForm from './EditEventDescriptionForm';

const noop = () => null;

describe('EditEventDescriptionForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditEventDescriptionForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save description"
        updated={false}
        updateInProgress={false}
        categories={[{ key: 'cat1', label: 'Cat 1' }, { key: 'cat2', label: 'Cat 2' }]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
