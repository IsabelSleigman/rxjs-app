import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { timer } from 'rxjs';
import { from, fromEvent, interval, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple;
  searchInput: string = '';
  searchEntry$: Subject<string> = new Subject<string>();


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

  tapClick() {
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

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100)
      setTimeout(() => observer.complete(), i * 100)
    });

    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        take(10) //first() pega o primeiro elemento  last() pega o ultimo elemento a ser gerado
      )
      .subscribe(v => console.log('Final: ', v),
        (error) => console.error(error),
        () => console.log('Complete!')
      );

    const interv = setInterval(() => {
      console.log('Checando...');
      if (s.closed) {
        console.warn('Subscription fechado!')
        clearInterval(interv)
      }
    }, 200)
  }
  debounceTimeClick() {
    fromEvent(document, 'click').pipe(
      tap((e) => console.log('Cliquei')),
      debounceTime(1000)
    ).subscribe((e: MouseEvent) => {
      console.log("Click", e);
      this.launchRipple();
    })

  }
  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true, centered: true
    });
    rippleRef.fadeOut();
  }
  debounceTimeSearch() {
    this.searchEntry$.pipe(
      debounceTime(700)
    ).subscribe((s) => console.log(s));
  }

  searchBy_Debounce($event) {
    this.searchEntry$.next(this.searchInput);
  }

  takeUntilClick() {
    let dueTime$ = timer(5000);
    interval(500)
    .pipe(
      takeUntil(dueTime$)
      ).subscribe((i) => console.log('TakeUntil', i),
      (error) => console.error(error),
      () => console.log('Completado'));

  }
  takeWhileClick() {
    interval(500)
    .pipe(
      takeWhile((value, index) => (value < 5))
      ).subscribe((i) => console.log('TakeWhile', i),
      (error) => console.error(error),
      () => console.log('Completado'));
  }
}