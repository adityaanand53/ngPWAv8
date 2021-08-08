import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostsService } from './posts.service';

import { take } from 'rxjs/operators';
import { fromEvent, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular8Project';
  body = 'Post this data';
  posts = [];

  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public connectionStatusMessage: string;
  public connectionStatus = "Online";

  deferredPrompt: any;
  showButton = false;

  // @ViewChild('pwaInstallbtn', {static: false}) pwaInstallbtn: ElementRef;

  // @HostListener('window:beforeinstallprompt', ['$event'])
  // onbeforeinstallprompt(e) {
  //   console.log(e);
  //   // Prevent Chrome 67 and earlier from automatically showing the prompt
  //   e.preventDefault();
  //   // Stash the event so it can be triggered later.
  //   this.deferredPrompt = e;
  //   this.showButton = true;
  // }
  // addToHomeScreen() {
  //   console.log('addToHomeScreen');
  //   // hide our user interface that shows our A2HS button
  //   this.showButton = false;
  //   // Show the prompt
  //   this.deferredPrompt.prompt();
  //   // Wait for the user to respond to the prompt
  //   this.deferredPrompt.userChoice
  //     .then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the A2HS prompt');
  //       } else {
  //         console.log('User dismissed the A2HS prompt');
  //       }
  //       this.deferredPrompt = null;
  //     });
  // }

  constructor(private dataService: PostsService) {

  }

  ngOnInit() {
    this.connectionStatusMessage = [];
    // [1, 2, 3, 4, 5].forEach(data => {
    //   this.dataService.getData(data).pipe(
    //     take(1)
    //   ).subscribe((data: any) => {
    //     this.posts = [...this.posts, data.title];
    //   }, err => {

    //   })
    // });

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(event => {
      this.connectionStatusMessage = 'Connected to internet! You are online';
      this.connectionStatus = 'online';
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are offline';
      alert('You are offline.')
    }));


  }

  // ngAfterViewInit() {
  //   setTimeout(() => this.pwaInstallbtn.nativeElement.click(), 2000);
  // }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }



  // postData() {
  //   this.dataService.postData(this.title, this.body).subscribe(res => {
  //     alert("Success");
  //     console.log(res);
  //   }, err => {
  //     alert("Error Occured");
  //   })
  // }
}
