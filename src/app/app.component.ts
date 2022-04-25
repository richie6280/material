import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'material';

  buttonToggle: boolean = true;
  chipToggle: boolean = true;

  @ViewChild('section') section!: ElementRef;
  @ViewChild('chip') chip!: ElementRef;

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  constructor(public dialog: MatDialog, private overlay: OverlayContainer) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';

      const overlayClassList = this.overlay.getContainerElement().classList;
      darkMode ? overlayClassList.add(darkClassName) : overlayClassList.remove(darkClassName);
    });
  }

  // showDialog(): void {
  //   this.dialog.open(DialogComponent,
  //     {
  //       width: '500px'
  //     });
  // }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //換主題
  chengeButton() {
    this.buttonToggle = !this.buttonToggle;

    const section = this.section.nativeElement;
    this.buttonToggle ? section.setAttribute('class', 'section') : section.setAttribute('class', 'custom-theme-2');
  }

  chengeChip() {
    this.chipToggle = !this.chipToggle;

    const chip = this.chip.nativeElement;
    this.chipToggle ? chip.setAttribute('class', 'custom-theme-1') : chip.setAttribute('class', 'custom-theme-2');
  }



}

