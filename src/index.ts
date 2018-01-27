import ComponentContainer from './ComponentContainer';
import Component from './decorator/Component';
import Injector from './Injector';

export default {
  startContainer: ComponentContainer.getInstance().startContainer,
  Component,
  Injector
};
