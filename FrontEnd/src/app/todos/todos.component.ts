import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UidService } from '@service/uid.service';
import { TodosService } from '@service/todos.service';
import { ApiService } from '@service/api.service';
import { LoginService } from '@service/login.service';
import { CommodityService } from '@service/commodity.service';
import { Method } from '@ts/enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  Method: Method;
  Add: string = "";
  changeNumber: number = 1;
  Change: string = "";
  Delete: number = 1;
  Price: number = 1000;
  Email: string = "";
  ItemDesc: string = "測試商品";
  SelectFile: File | null = null;
  fileUrl: Observable<string>;
  constructor(
    public todoList: TodosService,
    public islogin: LoginService,
    public uidStatus: UidService,
    private api: ApiService,
    private router: Router,
    private Commod: CommodityService
  ) { }
  ngOnInit() {
  }
  postServer(_name: string = "get") {
    let req;

    switch (_name) {
      case Method.POST:
        req = { data: { title: this.Add } };
        break;
      case Method.PUT:
        req = { getway: this.changeNumber, data: { title: this.Change } };
        break;
      case Method.DELETE:
        req = { getway: this.Delete, data: {} };
        break;
    }

    this.todoList.getTodos('/api/product', _name as Method, req);
    ["Change", "Add"].forEach(item => this[item] = "");
    ["changeNumber", "Delete"].forEach(item => this[item] = 1);
  }

  confrim() {
    let req = { data: { ItemDesc: this.ItemDesc, Amt: this.Price, Email: this.Email } };
    this.api.apiServer('/webPay/order', Method.POST, req).subscribe(
      res => {
        this.Commod.changeMerch(res);
        this.router.navigate([`/front/confrim/${res.MerchantOrderNo}`]);
      }
    );
  }

  fileEvent(value) {
    this.SelectFile = (value.target.files.length > 0) ? value.target.files[0] : null;
  }
  upLoadFile() {
    if (this.SelectFile) {
      let fileName = this.SelectFile.name;
      let formData = new FormData();
      formData.append('file', this.SelectFile, fileName);
      this.fileUrl = this.api.apiServer('/firebase/upload', Method.POST, { data: formData });
    }
  }
}
