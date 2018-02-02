import { ConstructorMap } from 'service/IoCService';

const basic: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: []
  }
};

const complex1: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: ['componentB']
  },
  componentB: {
    componentConstructor: Object,
    dependencies: []
  }
};

const complex2: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: ['componentB']
  },
  componentB: {
    componentConstructor: Object,
    dependencies: ['componentC']
  },
  componentC: {
    componentConstructor: Object,
    dependencies: []
  }
};

const selfDep: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: ['componentA']
  }
};

const cycleDep1: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: ['componentB']
  },
  componentB: {
    componentConstructor: Object,
    dependencies: ['componentA']
  }
};

const cycleDep2: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: ['componentB']
  },
  componentB: {
    componentConstructor: Object,
    dependencies: ['componentC']
  },
  componentC: {
    componentConstructor: Object,
    dependencies: ['componentA']
  }
};

const depNotFound: ConstructorMap = {
  componentA: {
    componentConstructor: Object,
    dependencies: ['nonExistingComponent']
  }
};

export default {
  basic,
  complex1,
  complex2,
  selfDep,
  cycleDep1,
  cycleDep2,
  depNotFound
};
