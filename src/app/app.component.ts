import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IpponStore } from '../features/store/ippon.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [IpponStore],
})
export class AppComponent implements OnInit {
  title = 'ippon-signal-store';
  name = '';

  readonly ipponStore = inject(IpponStore);


  ngOnInit(): void {
    this.name = this.ipponStore.name();
  }

  changeName() {
    this.ipponStore.changeName('Sebastien', 'F');
  }

  getAddress(userId: number) {
    this.ipponStore.getAddressFromExternal(userId);
  }

  reset() {
    this.ipponStore.reset();
  }
}
