import {Action} from 'redux';

export default interface IAction<T> extends Action<string> {
  payload: T;
}