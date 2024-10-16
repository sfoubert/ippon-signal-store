import { Injectable } from '@angular/core';
import { Address, User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      firstName: 'Sébastien',
      lastName: 'F',
      address: {
        id: 1,
        address1: '43 Av. de la Grande Armée',
        address2: '',
        city: 'Paris',
        zip: '75008',
        country: 'France',
      },
    }
  ];

  constructor() { }

  public getUser(userId: number): Observable<User | undefined> {
    return of(this.users.find(user => user.id === userId));
  }

  public getAddressByUserId(userId: number): Observable<Address | undefined> {
    return of(this.users.find(user => user.id === userId)?.address);
  }
}
