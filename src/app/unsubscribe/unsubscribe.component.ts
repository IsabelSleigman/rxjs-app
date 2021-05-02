import { takeUntil } from 'rxjs/operators';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {

  subscriptionsAreActive = false;

  subscription: Subscription[] = [];

  unsub$ = new Subject();

  constructor() { }

  ngOnInit(): void {

    this.checkSubscription();

  }
  checkSubscription() {

    interval(100)
    .subscribe(() => {
        let active = false;
        this.subscription.forEach((s) => {
          if (!s.closed)
            active = true;
        })
        this.subscriptionsAreActive = active;
      })
  }

  subscribe() {

    const subscription1 = interval(100)
      .pipe(
        takeUntil(this.unsub$)
      ).subscribe((i) => {
        console.log(i);
      })

    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(
        takeUntil(this.unsub$)
      )
      .subscribe((e) => console.log(e));

    this.subscription.push(subscription1);
    this.subscription.push(subscription2);


  }

  unsubscribe() {
    this.unsub$.next();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
