import React, { Component } from 'react';
import { func, node, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import { FilterForm } from '../../forms';
import css from './FilterPopup.css';

const KEY_CODE_ESCAPE = 27;

class FilterPopup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.filter = null;
    this.filterContent = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.positionStyleForContent = this.positionStyleForContent.bind(this);
  }

  handleSubmit(values) {
    const { onSubmit, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSubmit(urlParam, values);
  }

  handleClear() {
    const { onSubmit, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSubmit(urlParam, null);
  }

  handleCancel() {
    const { onSubmit, initialValues, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSubmit(urlParam, initialValues);
  }

  handleBlur(event) {
    // FocusEvent is fired faster than the link elements native click handler
    // gets its own event. Therefore, we need to check the origin of this FocusEvent.
    if (!this.filter.contains(event.relatedTarget)) {
      this.setState({ isOpen: false });
    }
  }

  handleKeyDown(e) {
    // Gather all escape presses to close menu
    if (e.keyCode === KEY_CODE_ESCAPE) {
      this.toggleOpen(false);
    }
  }

  toggleOpen(enforcedState) {
    if (enforcedState) {
      this.setState({ isOpen: enforcedState });
    } else {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  }

  positionStyleForContent() {
    if (this.filter && this.filterContent) {
      // Render the filter content to the right from the menu
      // unless there's no space in which case it is rendered
      // to the left
      const distanceToRight = window.innerWidth - this.filter.getBoundingClientRect().right;
      const labelWidth = this.filter.offsetWidth;
      const contentWidth = this.filterContent.offsetWidth;
      const contentWidthBiggerThanLabel = contentWidth - labelWidth;
      const renderToRight = distanceToRight > contentWidthBiggerThanLabel;
      const contentPlacementOffset = this.props.contentPlacementOffset;

      const offset = renderToRight
        ? { left: contentPlacementOffset }
        : { right: contentPlacementOffset };
      // set a min-width if the content is narrower than the label
      const minWidth = contentWidth < labelWidth ? { minWidth: labelWidth } : null;

      return { ...offset, ...minWidth };
    }
    return {};
  }

  render() {
    const {
      rootClassName,
      className,
      popupClassName,
      id,
      label,
      children,
      initialValues,
      contentPlacementOffset,
      //intl,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const labelStyles = true ? css.labelSelected : css.label;
    const contentStyle = this.positionStyleForContent();

    return (
      <div
        className={classes}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={node => {
          this.filter = node;
        }}
      >
        <button className={labelStyles} onClick={() => this.toggleOpen()}>
          {label}
        </button>
        <div
          id={id}
          className={classNames(popupClassName, css.popup, { [css.isOpen]: this.state.isOpen })}
          ref={node => {
            this.filterContent = node;
          }}
          style={contentStyle}
        >
          <FilterForm
            id={`${id}.form`}
            showAsPopup
            contentPlacementOffset={contentPlacementOffset}
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            onClear={this.handleClear}
          >
            {children}
          </FilterForm>
        </div>
      </div>
    );
  }
}

FilterPopup.defaultProps = {
  rootClassName: null,
  className: null,
  popupClassName: null,
  initialValues: null,
  contentPlacementOffset: 0,
  liveEdit: false,
  label: null,
};

FilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  popupClassName: string,
  id: string.isRequired,
  //urlParam: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: shape({}),
  contentPlacementOffset: number,
  label: string.isRequired,
  children: node.isRequired,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(FilterPopup);
