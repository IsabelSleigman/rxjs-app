import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription } from 'rxjs';
import { delay, filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  mapClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(i => i * 2),
        map(i => "Number:" + i),
        delay(1000)
      )
      .subscribe(i => console.log(i));

    fromEvent(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({ x: e.screenX, y: e.screenY })
        )).subscribe((pos) => console.log(pos));
  }

  filterClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        filter(a => a % 2 == 1)
      )
      .subscribe(a => console.log(a));

    interval(1000)
      .pipe(
        filter(i => i % 2 == 0),
        map(i => "Valor: " + i),
        delay(1000)
      )
      .subscribe(i => console.log(i));
  }

  tapClick(){
    interval(1000)
      .pipe(
        tap(i => console.log('')),
        tap(i => console.warn('Antes do Filtro', i)),
        filter(i => i % 2 == 0),
        tap(i => console.error('Depois do Filtro', i)),
        map(i => "Valor: " + i),
        tap(i => console.log('Depois do Map', i)),
        delay(1000)
      )
      .subscribe(i => console.log(i));
  }

  takeClick(){
    const observable = new Observable((observer) =>
    {
      let i;
      for(i=0;i<20;i++)
        setTimeout(() => observer.next(Math.floor(Math.random()*100)), i*100)
        setTimeout(()=> observer.complete(), i*100)
    });

    const s: Subscription = observable
    .pipe(
      tap(i => console.log(i)),
      take(10)
    )
    .subscribe(v => console.log('Final: ', v));
  }
}
