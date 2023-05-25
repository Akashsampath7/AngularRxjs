import { Component } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs2';
  users = [
    { id: '1', name: 'john', isActive: true},
    { id: '2', name: 'jack', isActive: true},
    { id: '2', name: 'mike', isActive: true},
  ];

  user$ = new BehaviorSubject<{id: string; name: string} | null>(null);


  users$ =of(this.users);
  usernames$ = this.users$.pipe(map((users) => users.map((user) => user.name)));
  filteredUsers$ = this.users$.pipe(
    filter((users) => users.every((user) =>user.isActive))
  );
  
  documentClick$ = fromEvent(document, 'click');
  
  ngOnInit(): void{
    this.documentClick$.subscribe((e) => {
      console.log('e', e);
    });

    setTimeout(() => {
      this.user$.next({id: '1', name: 'john'});
    }, 2000);
    this.user$.subscribe((user) => {
      console.log('user',user);
      });

    this.users$.subscribe((users)=> {
      console.log('users',users);
    });
  }

}
