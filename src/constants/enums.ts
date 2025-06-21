import {City, TrainType} from '@/services/api';
import {createLabel} from '@/services/formatters';

export const trainTypes = Object.values(TrainType).map(value => ({
  title: createLabel(value),
  value,
}));

export const cities = Object.values(City).map(value => ({
  title: createLabel(value),
  value,
}));
