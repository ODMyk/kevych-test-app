import {City} from '@/services/api';
import {create} from 'zustand';

interface Stop {
  name: City;
  date: number;
  time: number;
}

interface StopsState {
  stops: Stop[];
  setStops: (stops: Stop[]) => void;
}

export const useStopsStore = create<StopsState>(set => ({
  stops: [],

  setStops: (stops: Stop[]) => set({stops}),
}));
