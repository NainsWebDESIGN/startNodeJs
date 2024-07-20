import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommodityService } from '@service/commodity.service';
import { ApiService } from '@service/api.service';
import { Observable } from 'rxjs/Observable';
import { checkBack, checkFront } from '@ts/location';

@Component({
  selector: 'app-confrimPage',
  templateUrl: './confrimPage.component.html',
  styleUrls: ['./confrimPage.component.scss']
})
export class ConfrimPageComponent implements OnInit {
  merch$: Observable<any>;
  data;
  constructor(
    private router: Router,
    private Commod: CommodityService,
    private api: ApiService

  ) { }
  ngOnInit() {
    this.merch$ = this.Commod.merch$;
  }
  out() {
    this.router.navigate(['/front/todos']);
  }
  pay() {
    this.merch$.subscribe(
      res => {
        res.ReturnUrl = checkFront;
        res.NotifyUrl = checkBack;
        const req = {
          MerchantID: "MerchantID",
          shaEncrypt: "TradeSha",
          aesEncrypt: "TradeInfo",
          TimeStamp: "TimeStamp",
          Version: "Version",
          NotifyUrl: "NotifyUrl",
          ReturnUrl: "ReturnUrl",
          MerchantOrderNo: "MerchantOrderNo",
          Amt: "Amt",
          ItemDesc: "ItemDesc",
          Email: "Email",
        };
        let test = {};
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = res.PayGateWay;

        Object.keys(req).forEach(key => {
          test[key] = res[key];
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = req[key];
          input.value = res[key];
          form.appendChild(input);
        })
        console.log(test);

        // document.body.appendChild(form);
        // form.submit();
      },
      err => console.log(err)
    )
  }
}
