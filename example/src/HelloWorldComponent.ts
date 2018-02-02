import Koalats from 'koalats';
import Greeter from './GreeterComponent';
import Formatter from './FormatterComponent';

@Koalats.Component({
  name: 'HelloWorld',
  dependencies: ['Greeter']
})
export default class HelloWorldComponent {
  constructor(private greeter: Greeter) {
  }

  @Koalats.Inject('Formatter')
  private formatter: Formatter;

  public sayHelloWorld() {
    console.log(
      this.formatter.format(this.greeter.greet('World'))
    );
  }
}
