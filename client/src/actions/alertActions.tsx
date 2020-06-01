import { ActionTypes, BaseAction } from './types';

export interface AlertType {
  title: string;
  description: string;
  icon: string | null;
  dismiss: ((save: boolean) => void) | null;
}

export const ShowAlert = (data: AlertType): BaseAction => {
  const { title, description, dismiss, icon } = data;
  return {
    type: ActionTypes.SHOW_ALERT,
    payload: { title, description, dismiss, icon },
  };
};

export const HideAlert = (): BaseAction => {
  return {
    type: ActionTypes.HIDE_ALERT,
    payload: {},
  };
};
