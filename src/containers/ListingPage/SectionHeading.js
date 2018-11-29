import React from 'react';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionHeading = props => {
  const { priceTitle, formattedPrice, richTitle } = props;
  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id="ListingPage.perUnit" />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
      </div>
    </div>
  );
};

export default SectionHeading;
