import Koalats from 'koalats';

@Koalats.Component({
  name: 'Greeter',
})
export default class GreeterComponent {
  public greet(name: string) {
    return `Hello ${name}`;
  }
}
