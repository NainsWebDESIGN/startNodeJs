import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UidService } from '@service/uid.service';
import { TodosService } from '@service/todos.service';
import { ApiService } from '@service/api.service';
import { LoginService } from '@service/login.service';
import { CommodityService } from '@service/commodity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  // todoList: Observable<any>;
  Add: string = "";
  changeNumber: number = 1;
  Change: string = "";
  Delete: string = "";
  Price: number = 1000;
  Email: string = "";
  ItemDesc: string = "測試商品";
  constructor(
    public todoList: TodosService,
    private api: ApiService,
    public islogin: LoginService,
    public uidStatus: UidService,
    private router: Router,
    private Commod: CommodityService
  ) { }
  ngOnInit() {
    // this.todoList = this.todos.todos$;
  }
  postServer(_name: string = "get") {
    let req;

    switch (_name) {
      case "post":
        req = { data: { title: this.Add } };
        break;
      case "put":
        req = { getway: this.changeNumber, data: { title: this.Change } };
        break;
      case "delete":
        req = { getway: this.Delete, data: {} };
        break;
    }

    this.todoList.getTodos('/api/product', _name, req);
    ["Add", "Change", "Delete"].forEach(item => this[item] = "");
    this.changeNumber = 1;
  }

  confrim() {
    let req = { data: { ItemDesc: this.ItemDesc, Amt: this.Price, Email: this.Email } };
    this.api.apiServer('/webPay/order', 'post', req).subscribe(
      res => {
        console.log(res);
        this.Commod.changeMerch(res);
        this.router.navigate([`/front/confrim/${res.MerchantOrderNo}`]);
      }
    );
  }

}
