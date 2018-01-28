import Koalats from 'koalats';
@Koalats.Component({
  name: 'FirstComponent'
})
class FirstComponent {
  sayHello(): string {
    return "Hello";
  }
}

@Koalats.Component({
  name: 'AnotherComponent',
  dependencies: ['FirstComponent']
})
class AnotherComponent {
  constructor(private firstComponent: FirstComponent) {
  }

  sayHelloWorld(): string {
    return this.firstComponent.sayHello() + " World!";
  }
}

Koalats.startContainer();

console.log(
  Koalats.Injector.get<AnotherComponent>('AnotherComponent').sayHelloWorld(),
);
