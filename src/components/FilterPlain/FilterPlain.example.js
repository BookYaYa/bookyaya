import FilterPlain from './FilterPlain';

export const FilterPlainExample = {
  component: FilterPlain,
  props: {
    id: 'FilterPlainExample',
    liveEdit: true,
    showAsPopup: false,
    contentPlacementOffset: -14,
    onSubmit: values => {
      console.log(values);
    },
    label: 'Example label',
    children: 'Form field here',
  },
  group: 'misc',
};
