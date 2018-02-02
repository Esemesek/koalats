import Bootstrap from 'decorator/Bootstrap';
import IoCService from 'service/IoCService';

let mockedInit = jest.fn();
let mockedMain = jest.fn();

class WithoutInit {
  static main() {
    mockedMain();
  }
}


class WithInit {
  static main() {
    mockedMain();
  }

  public static initialize() {
    mockedInit();
  }
}

describe('Bootstrap decorator', () => {
  const container = IoCService.getInstance();
  let originalStart = container.startContainer;
  let mockedStart = jest.fn();

  beforeAll(() => {
    container.startContainer = mockedStart;
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  afterAll(() => {
    container.startContainer = originalStart;
  });

  test('should start container', () => {
    Bootstrap(WithoutInit);

    expect(mockedStart.mock.calls.length).toEqual(1);
    expect(mockedMain.mock.calls.length).toEqual(1);
  });

  test('should start container and call initialize', () => {
    Bootstrap(WithInit);

    expect(mockedStart.mock.calls.length).toEqual(1);
    expect(mockedInit.mock.calls.length).toEqual(1);
    expect(mockedMain.mock.calls.length).toEqual(1);
  });
});
