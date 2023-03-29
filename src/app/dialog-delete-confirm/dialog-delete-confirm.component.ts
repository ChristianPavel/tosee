import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-confirm',
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrls: ['./dialog-delete-confirm.component.css']
})
export class DialogDeleteConfirm {
    message: string = "Confirm Deletion";
    confirmButtonText = "Delete";
    cancelButtonText = "Cancel";

    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<DialogDeleteConfirm>) {
      if (data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.concel || this.cancelButtonText;
        }
      }
    }

    onConfirmClick(): void {
      this.dialogRef.close(true);
    }
}
