import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InlineTextButton, Modal, ModalInMobile, Button } from '../../components';
import { EnquiryForm } from '../../forms';
import { BookingDatesForm } from '../../forms';

import css from './ListingPage.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const SectionBooking = props => {
  const {
    title,
    listing,
    isOwnListing,
    isClosed,
    isBook,
    unitType,
    price,
    formattedPrice,
    priceTitle,
    showContactUser,
    onContactUser,
    handleBookingSubmit,
    richTitle,
    authorDisplayName,
    handleBookButtonClick,
    handleMobileBookModalClose,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    onSubmitEnquiry,
    sendEnquiryInProgress,
  } = props;
  const showClosedListingHelpText = listing.id && isClosed;

  return (
    <div>
      <ModalInMobile
        className={css.modalInMobile}
        containerClassName={css.modalContainer}
        id="BookingDatesFormInModal"
        isModalOpenOnMobile={isBook}
        onClose={handleMobileBookModalClose}
        showAsModalMaxWidth={MODAL_BREAKPOINT}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div className={css.modalHeading}>
          <h1 className={css.title}>{richTitle}</h1>
          <div className={css.author}>
            <span className={css.authorName}>
              <FormattedMessage id="ListingPage.hostedBy" values={{ name: authorDisplayName }} />
            </span>
          </div>
        </div>

        <div className={css.bookingHeading}>
          <h2 className={css.bookingTitle}>
            <FormattedMessage id="ListingPage.contactTitle" values={{ title: richTitle }} />
          </h2>
          <div className={css.bookingHelp}>
            <FormattedMessage
              id={
                showClosedListingHelpText
                  ? 'ListingPage.bookingHelpClosedListing'
                  : 'ListingPage.contactHelp'
              }
            />
          </div>
          {showContactUser ? (
            <Button rootClassName={css.contactButton} onClick={onContactUser}>
              <FormattedMessage id="ListingPage.contactUser" />
            </Button>
          ) : null}
        </div>
        <div className={css.bookingHeading}>
          <h2 className={css.bookingTitle}>
            <FormattedMessage id="ListingPage.bookingTitle" values={{ title: richTitle }} />
          </h2>
          <div className={css.bookingHelp}>
            <FormattedMessage
              id={
                showClosedListingHelpText
                  ? 'ListingPage.bookingHelpClosedListing'
                  : 'ListingPage.bookingHelp'
              }
            />
          </div>
        </div>
        {!isClosed ? (
          <BookingDatesForm
            className={css.bookingForm}
            submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
            unitType={unitType}
            onSubmit={handleBookingSubmit}
            price={price}
            isOwnListing={isOwnListing}
            timeSlots={timeSlots}
            fetchTimeSlotsError={fetchTimeSlotsError}
          />
        ) : null}
      </ModalInMobile>
      <div className={css.openBookingForm}>
        <div className={css.priceContainer}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id="ListingPage.perUnit" />
          </div>
        </div>

        <Button rootClassName={css.contactButton} onClick={onContactUser}>
          <FormattedMessage id="ListingPage.contactUser" />
        </Button>

        {!isClosed ? (
          <Button rootClassName={css.bookButton} onClick={handleBookButtonClick}>
            <FormattedMessage id="ListingPage.ctaButtonMessage" />
          </Button>
        ) : (
          <div className={css.closedListingButton}>
            <FormattedMessage id="ListingPage.closedListingButtonText" />
          </div>
        )}
      </div>
      <Modal
        id="ListingPage.enquiry"
        contentClassName={css.enquiryModalContent}
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <EnquiryForm
          className={css.enquiryForm}
          submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
          listingTitle={title}
          authorDisplayName={authorDisplayName}
          sendEnquiryError={sendEnquiryError}
          onSubmit={onSubmitEnquiry}
          inProgress={sendEnquiryInProgress}
        />
      </Modal>
    </div>
  );
};

export default SectionBooking;
