import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommodityService } from '@service/commodity.service';
import { FormDataService } from '@service/formData.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-confrimPage',
  templateUrl: './confrimPage.component.html',
  styleUrls: ['./confrimPage.component.scss']
})
export class ConfrimPageComponent implements OnInit {
  // merch$: Observable<any>;
  data;
  constructor(
    private router: Router,
    public Commod: CommodityService,
    private form: FormDataService

  ) { }
  ngOnInit() {
    // this.merch$ = this.Commod.merch$;
  }
  out() {
    this.router.navigate(['/front/todos']);
  }
  pay() {
    this.Commod.merch$.subscribe(
      res => {
        const req = {
          MerchantID: "MerchantID",
          TradeSha: "shaEncrypt",
          TradeInfo: "aesEncrypt",
          TimeStamp: "TimeStamp",
          Version: "Version",
          NotifyUrl: "NotifyUrl",
          ReturnUrl: "ReturnUrl",
          MerchantOrderNo: "MerchantOrderNo",
          Amt: "Amt",
          ItemDesc: "ItemDesc",
          Email: "Email",
        };
        this.form.formToURI("POST", res.PayGateWay, [req, res]);
      },
      err => console.log(err)
    )
  }
}
