import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[fitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit, OnDestroy {

  private observer!: ResizeObserver;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.resize();

    this.observer = new ResizeObserver(() => {
      this.resize();
    });

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private resize(): void {
    const el = this.element.nativeElement;

    const parent = el.parentElement;
    if (!parent) return;

    let min = 8;
    let max = 80;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);

      el.style.fontSize = `${mid}px`;

      if (
        el.scrollWidth <= parent.clientWidth &&
        el.scrollHeight <= parent.clientHeight
      ) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    el.style.fontSize = `${max}px`;
  }
}
