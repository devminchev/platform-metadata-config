const state = {
  mobileOverride: false,
  name: 'name',
  demoUrl: 'demo',
  realUrl: 'demo',
  gameLoaderFileName: 'demo',
  gameSkin: 'demo',
}

const invalidState = {
  mobileOverride: false,
  name: '',
  demoUrl: 'demo',
  realUrl: 'demo',
  gameLoaderFileName: 'demo',
  gameSkin: 'demo',
};

const validMobileState = {
  ...state,
  mobileOverride: true,
};

const invalidMobileState = {
  ...state,
  mobileOverride: true,

}

const mockSdk: any = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  ids: {
    app: 'test-app'
  },
  field: {
    getValue: jest.fn().mockReturnValueOnce(state),
    setValue: jest.fn(),
    setInvalid: jest.fn(),
  },
  window: {
    startAutoResizer: jest.fn(),
  },
};

const invalidMockSdk = {
  ...mockSdk,
  field: {
    ...mockSdk.field,
    getValue: jest.fn().mockReturnValueOnce(invalidState),
  },
};

const validMobileMockSdk = {
  ...mockSdk,
  field: {
    ...mockSdk.field,
    getValue: jest.fn().mockReturnValueOnce(validMobileState),
  },
};

const invalidMobileMockSdk = {
  ...mockSdk,
  field: {
    ...mockSdk.field,
    getValue: jest.fn().mockReturnValueOnce(invalidMobileState),
  },
};


export { mockSdk, invalidMockSdk, validMobileMockSdk, invalidMobileMockSdk };
