import FilterPopup from './FilterPopup';

export const FilterPopupExample = {
  component: FilterPopup,
  props: {
    id: 'FilterPopupExample',
    liveEdit: false,
    showAsPopup: true,
    contentPlacementOffset: -14,
    onSubmit: values => {
      console.log(values);
    },
    label: 'Example label',
    children: 'Form field here',
  },
  group: 'misc',
};
