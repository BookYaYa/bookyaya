import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import routeConfiguration from '../../routeConfiguration';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditEventDescriptionPanel,
  EditListingFeaturesPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditEventPoliciesPanel,
  EditListingPricingPanel,
} from '..';

import css from './EditEventWizard.css';

export const DESCRIPTION = 'description';
export const FEATURES = 'features';
export const POLICY = 'policy';
export const LOCATION = 'location';
export const PRICING = 'pricing';
export const PHOTOS = 'photos';

// EditEventWizardTab component supports these tabs
export const SUPPORTED_TABS = [DESCRIPTION, FEATURES, POLICY, LOCATION, PRICING, PHOTOS];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

const EditEventWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    fetchInProgress,
    newListingCreated,
    history,
    images,
    listing,
    handleCreateFlowTabScrolling,
    handleCreateListing,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onUpdateImageOrder,
    onRemoveImage,
    onUpdateListingDraft,
    onChange,
    updatedTab,
    updateInProgress,
    intl,
  } = props;

  const isNew = params.type === 'new';
  const currentListing = ensureListing(listing);
  const imageIds = images => {
    return images ? images.map(img => img.imageId || img.id) : null;
  };

  const onCompleteEditEventWizardTab = (tab, updateValues) => {
    if (isNew) {
      const onUpsertListingDraft =
        tab !== marketplaceTabs[0] ? onUpdateListingDraft : onCreateListingDraft;
      onUpsertListingDraft(updateValues);

      if (tab !== marketplaceTabs[marketplaceTabs.length - 1]) {
        // Create listing flow: smooth scrolling polyfill to scroll to correct tab
        handleCreateFlowTabScrolling(false);
        // Redirect to next tab
        const pathParams = pathParamsToNextTab(params, tab, marketplaceTabs);
        history.push(
          createResourceLocatorString('EditEventPage', routeConfiguration(), pathParams, {})
        );
      } else {
        // Normalize images for API call
        const imageIdArray = imageIds(updateValues.images);
        handleCreateListing({ ...listing.attributes, images: imageIdArray });
      }
    } else {
      const { images: updatedImages, ...rest } = updateValues;
      // Normalize images for API call
      const imageProperty =
        typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages) } : {};
      onUpdateListing(tab, { ...rest, id: currentListing.id, ...imageProperty });
    }
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      listing,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
    };
  };

  switch (tab) {
    case DESCRIPTION: {
      const submitButtonTranslationKey = isNew
        ? 'EditEventWizard.saveNewDescription'
        : 'EditEventWizard.saveEditDescription';
      return (
        <EditEventDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditEventWizardTab(tab, values);
          }}
        />
      );
    }
    case FEATURES: {
      const submitButtonTranslationKey = isNew
        ? 'EditEventWizard.saveNewFeatures'
        : 'EditEventWizard.saveEditFeatures';
      return (
        <EditListingFeaturesPanel
          {...panelProps(FEATURES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditEventWizardTab(tab, values);
          }}
        />
      );
    }
    case POLICY: {
      const submitButtonTranslationKey = isNew
        ? 'EditEventWizard.saveNewPolicies'
        : 'EditEventWizard.saveEditPolicies';
      return (
        <EditEventPoliciesPanel
          {...panelProps(POLICY)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditEventWizardTab(tab, values);
          }}
        />
      );
    }
    case LOCATION: {
      const submitButtonTranslationKey = isNew
        ? 'EditEventWizard.saveNewLocation'
        : 'EditEventWizard.saveEditLocation';
      return (
        <EditListingLocationPanel
          {...panelProps(LOCATION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditEventWizardTab(tab, values);
          }}
        />
      );
    }
    case PRICING: {
      const submitButtonTranslationKey = isNew
        ? 'EditEventWizard.saveNewPricing'
        : 'EditEventWizard.saveEditPricing';
      return (
        <EditListingPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditEventWizardTab(tab, values);
          }}
        />
      );
    }
    case PHOTOS: {
      const submitButtonTranslationKey = isNew
        ? 'EditEventWizard.saveNewPhotos'
        : 'EditEventWizard.saveEditPhotos';

      // newListingCreated and fetchInProgress are flags for the last wizard tab
      return (
        <EditListingPhotosPanel
          {...panelProps(PHOTOS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          newListingCreated={newListingCreated}
          fetchInProgress={fetchInProgress}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onSubmit={values => {
            onCompleteEditEventWizardTab(tab, values);
          }}
          onUpdateImageOrder={onUpdateImageOrder}
        />
      );
    }
    default:
      return null;
  }
};

EditEventWizardTab.defaultProps = {
  errors: null,
  listing: null,
  updatedTab: null,
};

const { array, bool, func, object, oneOf, shape, string } = PropTypes;

EditEventWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(['new', 'edit']).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  errors: shape({
    createListingsError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  newListingCreated: bool.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  images: array.isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  handleCreateFlowTabScrolling: func.isRequired,
  handleCreateListing: func.isRequired,
  onUpdateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveImage: func.isRequired,
  onUpdateListingDraft: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  intl: intlShape.isRequired,
};

export default EditEventWizardTab;
