import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    manufacturer: new FormControl(this.data?.manufacturer ?? ''),
    device_type: new FormControl(this.data?.device_type ?? ''),
    puff_type: new FormControl(this.data?.puff_type ?? ''),
    maximum_power: new FormControl(this.data?.maximum_power ?? ''),
    battery_capacity: new FormControl(this.data?.battery_capacity ?? ''),
    tank_capacity: new FormControl(this.data?.tank_capacity ?? '')
  })

  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: this.myForm.value.image ?? 'https://rismdata.nostroy.ru/logo/logoman028.png',
      configure: {
        manufacturer: this.myForm.value.manufacturer,
        device_type: this.myForm.value.device_type,
        puff_type: this.myForm.value.puff_type,
        maximum_power: this.myForm.value.maximum_power,
        battery_capacity: this.myForm.value.battery_capacity,
        tank_capacity: this.myForm.value.tank_capacity  //чтобы подробнее работало следует добавить сюда коди вывести в диалоговое окно
      }
    }
    this.dialogRef.close(this.data) // при закрытии окна передаем данные которые получили из формы
  }

  ngOnInit(): void {
  }
}
