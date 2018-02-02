import IoCService from './IoCService';

export default class InjectorServiceService {
  static get = <T>(name: string): T => IoCService.getInstance().getComponent(name);
}
