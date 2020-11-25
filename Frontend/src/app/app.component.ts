import { delay } from 'rxjs/operators';
import { SpinnerOverlayService } from './shared/services/spinner-overlay.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TCC';
  loading: boolean = false;
  constructor(
    private _loading: SpinnerOverlayService
  ) { }

  ngOnInit(): void {

    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
