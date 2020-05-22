import { ActionTypes, BaseAction } from './types';

export interface AlertType {
  title: string;
  description: string;
  dismiss: ((save: boolean) => void) | null;
}

export const ShowAlert = (data: AlertType): BaseAction => {
  const { title, description, dismiss } = data;
  return {
    type: ActionTypes.SHOW_ALERT,
    payload: { title, description, dismiss },
  };
};

export const HideAlert = (): BaseAction => {
  return {
    type: ActionTypes.HIDE_ALERT,
    payload: {},
  };
};
