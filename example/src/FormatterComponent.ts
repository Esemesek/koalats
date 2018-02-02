import Koalats from 'koalats';

@Koalats.Component({
  name: 'Formatter',
})
export default class FormatterComponent {
  public format(text: string): string {
    return text.toUpperCase();
  }
}
