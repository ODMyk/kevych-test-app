import {TrainType} from '@/services/api';
import * as Yup from 'yup';

export const scheduleSchema = Yup.object({
  routeName: Yup.string().required('Route name is required'),
  trainNumber: Yup.string().required('Train number is required'),
  trainType: Yup.string()
    .oneOf(Object.values(TrainType))
    .required('Train type is required'),
});

export type ScheduleForm = Yup.InferType<typeof scheduleSchema>;
