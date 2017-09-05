import { Injectable } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";


@Injectable()
export class UserService {
    username: string;

    constructor(private localStorageService: LocalStorageService){

        this.username = this.localStorageService.retrieve('username')

        this.localStorageService.observe('username')
            .subscribe((value: any) => this.username = value);
    }
}