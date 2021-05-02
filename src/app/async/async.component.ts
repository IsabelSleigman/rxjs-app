import { observable, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map, toArray, delay } from 'rxjs/operators';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  options$: Observable<string[]>;

  constructor() { }

  

  ngOnInit(): void {

    this.options$ = Observable.create(
      (observer) => {
        for(let i = 0; i < 10; i++){
          observer.next(`Minha opção ${i} `)
        }
        observer.complete();
      }
    )
    .pipe(
      map(s => s+'!'),
      toArray(),
      delay(2000)
    );
    this.options$.subscribe(s => console.log(s));
  }

}
