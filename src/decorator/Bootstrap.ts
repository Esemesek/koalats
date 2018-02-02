import ComponentContainer from '../ComponentContainer';

const Bootstrap = (target: any) => {
  if (target.initialize instanceof Function) {
    target.initialize();
  }

  ComponentContainer.getInstance().startContainer();

  target.main();
}

export default Bootstrap;
