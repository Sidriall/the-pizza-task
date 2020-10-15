import { FormikProps } from 'formik';

export interface IOrderForm {
  name: string;
  surname: string;
  address?: string;
}

export interface OuterProps {
  onSubmit(): void;
}

export type IProps = FormikProps<IOrderForm> & any; // TODO remove any
