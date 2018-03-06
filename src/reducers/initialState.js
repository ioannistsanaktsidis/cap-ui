import {Map, List, fromJS} from 'immutable'


const search = Map({
  query: '',
  aggs: Map({}),
  selectedAggs: Map({}),
  results: Map({
    hits: [],
    total: 0
  }),
  error: Map({}),
  loading: false
});

const fuelSavings = Map({
  newMpg: '',
  tradeMpg: '',
  newPpg: '',
  tradePpg: '',
  milesDriven: '',
  milesDrivenTimeframe: 'week',
  displayResults: false,
  dateModified: null,
  necessaryDataIsProvidedToCalculateSavings: false,
  savings: {
    monthly: 0,
    annual: 0,
    threeYear: 0
  }
});

export default {
  fuelSavings: fuelSavings,
  search: search
};

