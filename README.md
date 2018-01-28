# KoalaTS

KoalaTS is library that provides simple IoC Container.

# How to install?

With npm
```shell
npm install koalats --save
```

With yarn
```shell
yarn add koalats
```

## How to use?

```javascript
import Koalats from 'koalats';

/*
  Declare your first component.
  If no dependencies are provided empty array will be passed.
*/
@Koalats.Component({
  name: 'SomeComponentName',
})
class SomeComponent {
  public sayHello(): string {
    return 'Hello';
  }
}

/*
  Declare second component with dependency to first component.
  Dependencies will be automatically injected to constructor in given order.
*/
@Koalats.Componenet({
  name: 'AnotherComponent',
  dependencies: ['SomeComponentName']
})
class AnotherComponent {
  constructor(private someComponent: SomeComponent) {
  }

  public sayHelloWorld(): string {
    return this.someComponent.sayHello() + ' World!';
  }
}

/*
  Start your container.
  In this step all instances of components are created in container and their dependecies are resolved.
*/
Koalats.startContainer();

// Get component from container
Koalats.Injector.get<AnotherComponent>('AnotherComponent').sayHelloWorld();
```
