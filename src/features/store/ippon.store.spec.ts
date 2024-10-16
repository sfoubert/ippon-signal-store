import { TestBed } from '@angular/core/testing';
import { IpponStore } from './ippon.store';

describe('IpponStore', () => {

    it('should verify that store is initialized', () => {
      const store = TestBed.inject(IpponStore);
      
      expect(store.name()).toEqual('John Doe');
    });
});