import { FormikProps } from 'formik';

export interface IUserForm {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface OuterProps {
  onSubmit(): void;
  isNewUser: boolean;
}

export type IProps = FormikProps<IUserForm> & any; // TODO remove any
