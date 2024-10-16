import { Component, inject } from '@angular/core';
import { IpponStore } from '../../../features/store/ippon.store';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  readonly ipponStore = inject(IpponStore);

}
