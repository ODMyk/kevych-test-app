import {City, TrainType} from '@/services/api';
import {create} from 'zustand';

export interface FiltersState {
  trainType?: TrainType;
  origin?: City;
  destination?: City;
  date?: string;

  setTrainType: (trainType?: TrainType) => void;
  setOrigin: (origin?: City) => void;
  setDestination: (destination?: City) => void;
  setDate: (date?: string) => void;
}

export const initialFiltersState: Partial<FiltersState> = {
  trainType: undefined,
  origin: undefined,
  destination: undefined,
  date: undefined,
};

export const useFiltersStore = create<FiltersState>(set => ({
  ...initialFiltersState,

  setTrainType: (trainType?: TrainType) => {
    set({trainType});
  },
  setOrigin: (origin?: City) => {
    set({origin});
  },
  setDestination: (destination?: City) => {
    set({destination});
  },
  setDate: (date?: string) => {
    set({date});
  },
}));
