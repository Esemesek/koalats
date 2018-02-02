import Koalats from 'koalats';
import HelloWorld from './HelloWorldComponent';
import './FormatterComponent';
import './GreeterComponent';
import './HelloWorldComponent';

@Koalats.Bootstrap
class SimpleApplication {
  static initialize() {
    console.log('Initialize application');
  }

  static main() {
    const helloWorld = Koalats.InjectorService.get<HelloWorld>('HelloWorld');
    helloWorld.sayHelloWorld();
  }
}
