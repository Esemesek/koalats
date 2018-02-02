import IoCService from '../service/IoCService';

const Bootstrap = (target: any) => {
  if (target.initialize instanceof Function) {
    target.initialize();
  }

  IoCService.getInstance().startContainer();

  target.main();
}

export default Bootstrap;
