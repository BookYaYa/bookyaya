import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { required } from '../../util/validators';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldSelect } from '../../components';

import css from './EditEventPoliciesForm.css';

const MAX_CAPACITY = 12;

export class EditEventPoliciesFormComponent extends Component {
  createOptions = () => {
    let options = [];

    for (let i = 1; i <= MAX_CAPACITY; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            disabled,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
          } = fieldRenderProps;

          const capacityLabel = intl.formatMessage({
            id: 'EditEventDescriptionForm.capacityLabel',
          });
          const capacityPlaceholder = intl.formatMessage({
            id: 'EditEventDescriptionForm.capacityPlaceholder',
          });
          const capacityRequired = required(
            intl.formatMessage({
              id: 'EditEventDescriptionForm.capacityRequired',
            })
          );

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditEventPoliciesForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}

              <FieldSelect
                id="capacity"
                name="capacity"
                className={css.capacity}
                label={capacityLabel}
                validate={capacityRequired}
              >
                <option disabled value="">
                  {capacityPlaceholder}
                </option>
                {this.createOptions()}
              </FieldSelect>

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditEventPoliciesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

const { func, string, bool } = PropTypes;

EditEventPoliciesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

export default compose(injectIntl)(EditEventPoliciesFormComponent);
