import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appYTHoverPlay]',
  standalone: true
})
export class YTHoverPlayDirective {
  constructor(private el: ElementRef<HTMLIFrameElement>) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.postToPlayer('playVideo');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.postToPlayer('pauseVideo');
  }

  private postToPlayer(command: 'playVideo' | 'pauseVideo') {
    const iframe = this.el.nativeElement;
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
  }
}
