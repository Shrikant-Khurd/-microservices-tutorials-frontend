import { TestBed } from '@angular/core/testing';

import { ApiErrorInterceptorInterceptor } from './api-error-interceptor.interceptor';

describe('ApiErrorInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiErrorInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiErrorInterceptorInterceptor = TestBed.inject(ApiErrorInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
