import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommodityService } from '@service/commodity.service';
import { ApiService } from '@service/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-confrimPage',
  templateUrl: './confrimPage.component.html',
  styleUrls: ['./confrimPage.component.scss']
})
export class ConfrimPageComponent implements OnInit {
  // routerID = this.acRouter.snapshot.paramMap.get('id');
  merch$: Observable<any>;
  data;
  constructor(
    // private acRouter: ActivatedRoute, 
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
        const req = {
          MerchantID: res.MerchantID,
          TradeSha: res.shaEncrypt,
          TradeInfo: res.aesEncrypt,
          TimeStamp: res.TimeStamp,
          Version: res.Version,
          NotifyUrl: res.NotifyUrl,
          ReturnUrl: res.ReturnUrl,
          MerchantOrderNo: res.MerchantOrderNo,
          AtomicsItemDesc: res.AtomicsItemDesc,
          Email: res.Email
        }
        this.api.apiServer("https://ccore.newebpay.com/MPG/mpg_gateway", 'post', req)
          .subscribe(_res => console.log(_res))
      },
      err => console.log(err)
    )
  }
}
