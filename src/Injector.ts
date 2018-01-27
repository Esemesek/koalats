import ComponentContainer from './ComponentContainer';

export default class Injector {
  static get = <T>(name: string): T => ComponentContainer.getInstance().getComponent(name);
}
